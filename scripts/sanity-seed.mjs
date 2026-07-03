import { createClient } from '@sanity/client';
import { readFileSync, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(
  readFileSync(join(root, '.env'), 'utf8')
    .split('\n').filter(Boolean).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);

const client = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: 'production',
  token: env.SANITY_AUTH_TOKEN,
  apiVersion: '2023-01-01',
  useCdn: false,
});

const pl = JSON.parse(readFileSync(join(root, 'src/i18n/pl.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(root, 'src/i18n/en.json'), 'utf8'));
const ro = JSON.parse(readFileSync(join(root, 'src/i18n/ro.json'), 'utf8'));

const L = (getter) => ({ pl: getter(pl), en: getter(en), ro: getter(ro) });
const key = (p, i) => `${p}${i}`;

// Upload an image from src/assets and return an image field value.
async function img(file) {
  const asset = await client.assets.upload('image', createReadStream(join(root, 'src/assets', file)), { filename: file });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function main() {
  console.log('Uploading images...');
  const [whoImg, howImg, giftImg, workImg, ctaImg] = await Promise.all([
    img('who-we-are.jpg'), img('how-we-work.jpg'), img('gift-sets.jpg'), img('our-work.jpg'), img('lets-create.jpg'),
  ]);

  console.log('Building siteContent...');
  const siteContent = {
    _id: 'siteContent', _type: 'siteContent',
    heroKicker: L((d) => d.hero.kicker), heroTitle: L((d) => d.hero.title), heroSubtitle: L((d) => d.hero.subtitle),
    whoTitle: L((d) => d.whoWeAre.title),
    whoItems: pl.whoWeAre.items.map((_, i) => ({ _key: key('who', i), text: { pl: pl.whoWeAre.items[i].text, en: en.whoWeAre.items[i].text, ro: ro.whoWeAre.items[i].text } })),
    whoHighlight: L((d) => d.whoWeAre.highlight), whoImage: whoImg,
    whyTitle: L((d) => d.whyIn2.title),
    whyItems: pl.whyIn2.items.map((_, i) => ({ _key: key('why', i), _type: 'localeString', pl: pl.whyIn2.items[i], en: en.whyIn2.items[i], ro: ro.whyIn2.items[i] })),
    howTitle: L((d) => d.howWeWork.title),
    howSteps: pl.howWeWork.steps.map((_, i) => ({ _key: key('how', i),
      title: { pl: pl.howWeWork.steps[i].title, en: en.howWeWork.steps[i].title, ro: ro.howWeWork.steps[i].title },
      text: { pl: pl.howWeWork.steps[i].text, en: en.howWeWork.steps[i].text, ro: ro.howWeWork.steps[i].text } })),
    howImage: howImg,
    giftsTitle: L((d) => d.giftSets.title), giftsDescription: L((d) => d.giftSets.description),
    giftsItems: pl.giftSets.items.map((_, i) => ({ _key: key('gift', i), _type: 'localeString', pl: pl.giftSets.items[i], en: en.giftSets.items[i], ro: ro.giftSets.items[i] })),
    giftsHighlight: L((d) => d.giftSets.highlight), giftsImage: giftImg,
    workTitle: L((d) => d.ourWork.title), workSubtitle: L((d) => d.ourWork.subtitle), workIntro: L((d) => d.ourWork.intro), workFeatureImage: workImg,
    ctaTitle: L((d) => d.cta.title), ctaDescription: L((d) => d.cta.description), ctaImage: ctaImg,
    contactPerson: pl.contact.person, contactRole: L((d) => d.contact.role),
    contactEmail: pl.contact.email, contactPhone: pl.contact.phone, contactWebsite: pl.contact.website,
    contactInstagram: 'https://instagram.com/in2scentedart/', contactFacebook: 'https://facebook.com/in2scentedart/',
  };
  await client.createOrReplace(siteContent);
  console.log('  siteContent seeded.');

  console.log('Creating portfolio projects...');
  const projSpecs = [
    { file: 'who-we-are.jpg', pl: 'Powerbank, kubek termiczny i zestaw narzędzi', en: 'Branded powerbank, tumbler and tool set', ro: 'Powerbank, cană termică și set de scule' },
    { file: 'why-in2.jpg', pl: 'Notes, długopis, butelka i kosmetyczka', en: 'Notebook, pen, bottle and pouch', ro: 'Agendă, pix, sticlă și trusă cosmetică' },
    { file: 'gift-sets.jpg', pl: 'Ekskluzywny zestaw prezentowy', en: 'Curated premium gift set', ro: 'Set cadou premium curatoriat' },
    { file: 'lets-create.jpg', pl: 'Firmowe pudełko prezentowe IN2', en: 'Signature IN2 gift box', ro: 'Cutie cadou IN2 personalizată' },
    { file: 'how-we-work.jpg', pl: 'Szkice koncepcji produktów zapachowych', en: 'Concept sketches for scented products', ro: 'Schițe de concept pentru produse parfumate' },
  ];
  let order = 10;
  for (const p of projSpecs) {
    const cover = await img(p.file);
    await client.createOrReplace({
      _id: 'project-' + p.file.replace(/\W+/g, '-'), _type: 'project',
      title: { pl: p.pl, en: p.en, ro: p.ro }, coverImage: cover,
      order, featured: order === 10,
    });
    order += 10;
  }
  console.log('  projects seeded.');

  console.log('Creating chat entries...');
  const cpl = JSON.parse(readFileSync(join(root, 'src/data/chat-pl.json'), 'utf8'));
  const cen = JSON.parse(readFileSync(join(root, 'src/data/chat-en.json'), 'utf8'));
  const cro = JSON.parse(readFileSync(join(root, 'src/data/chat-ro.json'), 'utf8'));
  const byId = (arr) => Object.fromEntries(arr.map((e) => [e.id, e]));
  const mpl = byId(cpl), men = byId(cen), mro = byId(cro);
  let corder = 10;
  const tx = client.transaction();
  for (const e of cen) {
    const id = e.id;
    tx.createOrReplace({
      _id: 'chat-' + id, _type: 'chatEntry',
      question: { pl: mpl[id]?.question || '', en: e.question, ro: mro[id]?.question || '' },
      answer: { pl: mpl[id]?.answer || '', en: e.answer, ro: mro[id]?.answer || '' },
      keywordsEn: (e.keywords || []).join(', '),
      keywordsPl: (mpl[id]?.keywords || []).join(', '),
      keywordsRo: (mro[id]?.keywords || []).join(', '),
      order: corder,
    });
    corder += 10;
  }
  await tx.commit();
  console.log('  chat entries seeded:', cen.length);

  console.log('DONE ✅');
}
main().catch((e) => { console.error('SEED ERROR:', e.message); process.exit(1); });
