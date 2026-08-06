import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "fs";
import { resolve, dirname, extname, basename, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SOURCE_DIRS = [
  resolve(root, "public"),
  resolve(root, "public/assets/images"),
  resolve(root, "src/link"),
];

const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const SKIP = new Set(["logo192.png", "logo512.png", "favicon.ico"]);

function collectSources() {
  const files = [];
  for (const dir of SOURCE_DIRS) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (SKIP.has(name)) continue;
      const ext = extname(name).toLowerCase();
      if (!SOURCE_EXTS.has(ext)) continue;
      const full = join(dir, name);
      if (!statSync(full).isFile()) continue;
      files.push(full);
    }
  }
  return files;
}

async function convert(input) {
  const dir = dirname(input);
  const base = basename(input, extname(input));
  const webpOut = join(dir, `${base}.webp`);
  const avifOut = join(dir, `${base}.avif`);
  const before = statSync(input).size;

  const pipeline = sharp(input);
  const meta = await pipeline.metadata();

  if (!existsSync(webpOut)) {
    await pipeline.clone().webp({ quality: 80 }).toFile(webpOut);
  }

  await pipeline.clone().avif({ quality: 55, effort: 4 }).toFile(avifOut);

  const webpSize = existsSync(webpOut) ? statSync(webpOut).size : 0;
  const avifSize = statSync(avifOut).size;
  const label = basename(input);
  console.log(
    `OK ${label} [${meta.width}x${meta.height}] ` +
      `${(before / 1024).toFixed(1)} KB → webp ${(webpSize / 1024).toFixed(1)} KB / ` +
      `avif ${(avifSize / 1024).toFixed(1)} KB`
  );
}

const sources = collectSources();
console.log(`\nGenerating AVIF (+ missing WebP) for ${sources.length} images...\n`);

let ok = 0;
let fail = 0;
for (const src of sources) {
  try {
    await convert(src);
    ok++;
  } catch (err) {
    fail++;
    console.error(`FAIL ${src}: ${err.message}`);
  }
}

console.log(`\nDone. ${ok} ok, ${fail} failed.\n`);
