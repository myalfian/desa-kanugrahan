/**
 * Optimasi aset gambar untuk koneksi seluler desa.
 * Menghasilkan varian WebP + AVIF responsif (480w, 960w, 1600w) ke /public/images.
 *
 * Pemakaian:  node scripts/optimize-images.mjs <folder-sumber>
 * Default sumber: ./assets-src
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC = process.argv[2] ?? './assets-src';
const OUT = './public/images';
const WIDTHS = [480, 960, 1600];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const { name } = parse(file);
  const input = sharp(join(SRC, file));
  const meta = await input.metadata();

  for (const w of WIDTHS) {
    const resized = input.clone().resize({ width: w, withoutEnlargement: false, kernel: 'lanczos3' });
    await resized.clone().webp({ quality: 75, effort: 5 }).toFile(join(OUT, `${name}-${w}.webp`));
    await resized.clone().avif({ quality: 60, effort: 5 }).toFile(join(OUT, `${name}-${w}.avif`));
  }
  // Placeholder blur super-kecil (LQIP) ~ <1KB
  const lqip = await input.clone().resize(24).webp({ quality: 30 }).toBuffer();
  console.log(`✔ ${name}  LQIP: data:image/webp;base64,${lqip.toString('base64').slice(0, 40)}…`);
}
console.log(`Selesai: ${files.length} gambar → ${OUT}`);
