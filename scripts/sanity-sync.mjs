// Regenerates the site's content files from Sanity (source of truth).
// Runs before `astro build`. Safe: only overwrites CMS-managed fields/files.
import { readFileSync, writeFileSync, createWriteStream, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Readable } from 'node:stream';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let fileEnv = {};
if (existsSync(join(root, '.env'))) {
  fileEnv = Object.fromEntries(
    readFileSync(join(root, '.env'), 'utf8').split('\n').filter(Boolean)
      .map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
  );
}
// CI env vars take precedence over local .env.
const PID = process.env.SANITY_PROJECT_ID || fileEnv.SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_AUTH_TOKEN || fileEnv.SANITY_AUTH_TOKEN;
const LANGS = ['pl', 'en', 'ro'];

if (!PID || !TOKEN) {
  console.warn('sanity-sync: no Sanity credentials — skipping (building from existing files).');
  process.exit(0);
}

async function groq(query) {
  const url = `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${url}: ${res.status}`);
  await new Promise((resolve, reject) => {
    const f = createWriteStream(dest);
    Readable.fromWeb(res.body).pipe(f).on('finish', resolve).on('error', reject);
  });
}

// helper: pick a localized value {pl,en,ro} for lang, fallback to en/pl.
const pick = (obj, lang) => (obj && (obj[lang] ?? obj.en ?? obj.pl)) || '';

async function main() {
  console.log('Fetching from Sanity...');
  const sc = await groq(`*[_id=="siteContent"][0]{
    ...,
    "whoImageUrl": whoImage.asset->url,
    "howImageUrl": howImage.asset->url,
    "giftsImageUrl": giftsImage.asset->url,
    "workImageUrl": workFeatureImage.asset->url,
    "ctaImageUrl": ctaImage.asset->url
  }`);
  const projects = await groq(`*[_type=="project"]|order(order asc){
    _id, title, description, featured, "coverUrl": coverImage.asset->url,
    "gallery": gallery[].asset->url
  }`);
  const chat = await groq(`*[_type=="chatEntry"]|order(order asc){
    _id, question, answer, keywordsPl, keywordsEn, keywordsRo
  }`);
  if (!sc) throw new Error('siteContent not found');

  // 1) i18n texts: overwrite CMS-managed fields, keep nav/seo/meta/footer/chat-UI.
  for (const lang of LANGS) {
    const p = join(root, 'src/i18n', `${lang}.json`);
    const t = JSON.parse(readFileSync(p, 'utf8'));
    t.hero.kicker = pick(sc.heroKicker, lang);
    t.hero.title = pick(sc.heroTitle, lang);
    t.hero.subtitle = pick(sc.heroSubtitle, lang);
    t.whoWeAre.title = pick(sc.whoTitle, lang);
    t.whoWeAre.items = (sc.whoItems || []).map((it) => ({ text: pick(it.text, lang) }));
    t.whoWeAre.highlight = pick(sc.whoHighlight, lang);
    t.whyIn2.title = pick(sc.whyTitle, lang);
    t.whyIn2.items = (sc.whyItems || []).map((it) => pick(it, lang));
    t.howWeWork.title = pick(sc.howTitle, lang);
    t.howWeWork.steps = (sc.howSteps || []).map((s) => ({ title: pick(s.title, lang), text: pick(s.text, lang) }));
    t.giftSets.title = pick(sc.giftsTitle, lang);
    t.giftSets.description = pick(sc.giftsDescription, lang);
    t.giftSets.items = (sc.giftsItems || []).map((it) => pick(it, lang));
    t.giftSets.highlight = pick(sc.giftsHighlight, lang);
    t.ourWork.title = pick(sc.workTitle, lang);
    t.ourWork.subtitle = pick(sc.workSubtitle, lang);
    t.ourWork.intro = pick(sc.workIntro, lang);
    if (sc.contactPerson) t.contact.person = sc.contactPerson;
    t.contact.role = pick(sc.contactRole, lang) || t.contact.role;
    if (sc.contactEmail) t.contact.email = sc.contactEmail;
    if (sc.contactPhone) t.contact.phone = sc.contactPhone;
    if (sc.contactWebsite) t.contact.website = sc.contactWebsite;
    writeFileSync(p, JSON.stringify(t, null, 2) + '\n');
  }
  console.log('  i18n texts updated.');

  // 2) Section images: download and overwrite existing src/assets files.
  const imgMap = {
    'who-we-are.jpg': sc.whoImageUrl, 'how-we-work.jpg': sc.howImageUrl,
    'gift-sets.jpg': sc.giftsImageUrl, 'our-work.jpg': sc.workImageUrl,
    'lets-create.jpg': sc.ctaImageUrl,
  };
  for (const [file, url] of Object.entries(imgMap)) {
    if (url) { await download(url + '?w=1600&fit=max', join(root, 'src/assets', file)); }
  }
  console.log('  section images synced.');

  // 3) Projects: download covers + write a data file for the portfolio.
  mkdirSync(join(root, 'src/assets/projects'), { recursive: true });
  const projOut = [];
  for (let i = 0; i < projects.length; i++) {
    const pr = projects[i];
    const fname = `project-${i}.jpg`;
    if (pr.coverUrl) await download(pr.coverUrl + '?w=1200&fit=max', join(root, 'src/assets/projects', fname));
    projOut.push({
      image: fname,
      featured: !!pr.featured,
      title: { pl: pick(pr.title, 'pl'), en: pick(pr.title, 'en'), ro: pick(pr.title, 'ro') },
      description: { pl: pick(pr.description, 'pl'), en: pick(pr.description, 'en'), ro: pick(pr.description, 'ro') },
    });
  }
  writeFileSync(join(root, 'src/data/projects.json'), JSON.stringify(projOut, null, 2) + '\n');
  console.log(`  ${projOut.length} projects synced.`);

  // 4) Chat KB: rebuild chat-{lang}.json from chatEntries.
  const split = (s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean);
  for (const lang of LANGS) {
    const kwField = { pl: 'keywordsPl', en: 'keywordsEn', ro: 'keywordsRo' }[lang];
    const arr = chat.map((e) => ({
      id: e._id.replace(/^chat-/, ''),
      keywords: split(e[kwField]),
      question: pick(e.question, lang),
      answer: pick(e.answer, lang),
    }));
    writeFileSync(join(root, 'src/data', `chat-${lang}.json`), JSON.stringify(arr, null, 2) + '\n');
  }
  console.log(`  chat KB synced (${chat.length} entries × 3 langs).`);
  console.log('SYNC DONE ✅');
}
main().catch((e) => { console.error('SYNC ERROR:', e.message); process.exit(1); });
