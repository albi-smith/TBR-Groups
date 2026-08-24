// Regenerates src/data/imageDimensions.json — intrinsic width/height for every
// image served by the app, so <Image> components can provide proper dimensions.
// Usage: node scripts/generate-image-dimensions.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const linkDir = path.join(root, "src", "link");
const outFile = path.join(root, "src", "data", "imageDimensions.json");

const EXT_RE = /\.(jpe?g|png|webp|avif)$/i;

async function scanDir(dir, keyFn) {
  const results = {};
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(results, await scanDir(full, keyFn));
    } else if (EXT_RE.test(entry.name)) {
      try {
        const meta = await sharp(full).metadata();
        if (meta.width && meta.height) {
          results[keyFn(full, entry.name)] = {
            w: meta.width,
            h: meta.height,
          };
        }
      } catch (err) {
        console.error("skip", full, err.message);
      }
    }
  }
  return results;
}

const allFiles = await scanDir(publicDir, (full, name) => {
  const rel = path.relative(root, full).replace(/\\/g, "/");
  return "/" + rel.replace(/^public\//, "");
});
const linkFiles = await scanDir(linkDir, (full, name) => name);

const data = { byPath: allFiles, byFile: linkFiles };
fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
console.log(
  `wrote ${outFile}: ${Object.keys(allFiles).length} public paths, ${Object.keys(linkFiles).length} imported link files`
);
