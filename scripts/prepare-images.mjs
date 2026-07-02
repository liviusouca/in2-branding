import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'extracted_images';
const OUT = 'src/assets';
mkdirSync(OUT, { recursive: true });

// Source pages are 1672 x 941. Crops isolate clean photographic regions
// (products / decor), avoiding the baked-in English text.
const jobs = [
  // logo lockup (monogram + IN2 + BRANDING) on cream — page 1
  { src: 'img-000.jpg', out: 'logo-lockup.png', left: 610, top: 165, width: 452, height: 452, png: true },
  // decorative botanical leaves, top-right of hero — page 1
  { src: 'img-000.jpg', out: 'hero-leaves.jpg', left: 1160, top: 0, width: 512, height: 640 },
  // Who We Are products (powerbank, tumbler, tool set) — page 2
  { src: 'img-001.jpg', out: 'who-we-are.jpg', left: 770, top: 20, width: 902, height: 901 },
  // How We Work sketchbook — page 3
  { src: 'img-002.jpg', out: 'how-we-work.jpg', left: 740, top: 0, width: 932, height: 941 },
  // Why IN2 products (notebook, pen, bottle) — page 4
  { src: 'img-003.jpg', out: 'why-in2.jpg', left: 780, top: 40, width: 892, height: 860 },
  // Gift set red box, open + closed — page 5
  { src: 'img-004.jpg', out: 'gift-sets.jpg', left: 540, top: 30, width: 1132, height: 880 },
  // Our Work product lineup (trims left text) — page 6
  { src: 'img-005.jpg', out: 'our-work.jpg', left: 430, top: 0, width: 1242, height: 941 },
  // Let's Create dark gift box — page 7
  { src: 'img-006.jpg', out: 'lets-create.jpg', left: 850, top: 20, width: 800, height: 901 },
  // Contact vase / botanical decor — page 8
  { src: 'img-007.jpg', out: 'contact-decor.jpg', left: 1424, top: 150, width: 248, height: 751 },
];

for (const j of jobs) {
  let p = sharp(`${SRC}/${j.src}`).extract({ left: j.left, top: j.top, width: j.width, height: j.height });
  if (j.png) p = p.png({ quality: 92 });
  else p = p.jpeg({ quality: 88 });
  await p.toFile(`${OUT}/${j.out}`);
  console.log('wrote', j.out);
}
console.log('done');
