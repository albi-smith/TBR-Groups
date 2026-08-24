import sharp from "sharp";
import { statSync, writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const images = [
  // 1. Navbar logo (Displayed at 4rem = 64px, @2x = 128px)
  {
    input: rootDir + "/public/logo.png",
    outputPng: rootDir + "/public/logo.png",
    outputWebp: rootDir + "/public/logo.webp",
    width: 128,
    height: 128
  },
  // 2. LinkHub Hero logo (Displayed at 80px, @2x = 160px)
  {
    input: rootDir + "/public/tbrlogo.jpeg",
    outputJpg: rootDir + "/public/tbrlogo.jpeg",
    outputWebp: rootDir + "/public/tbrlogo.webp",
    width: 160,
    height: 160
  },
  // 3. LinkHub cards (Displayed at 48px, @2x = 96px)
  {
    input: rootDir + "/src/link/tbr-education-logo.png",
    outputPng: rootDir + "/src/link/tbr-education-logo.png",
    outputWebp: rootDir + "/src/link/tbr-education-logo.webp",
    width: 96,
    height: 96
  },
  {
    input: rootDir + "/src/link/tbr-groups-logo.png",
    outputPng: rootDir + "/src/link/tbr-groups-logo.png",
    outputWebp: rootDir + "/src/link/tbr-groups-logo.webp",
    width: 96,
    height: 96
  },
  // 4. Large images (Below fold, display width ~400-600px, dimensions are already optimal for @2x, do not resize, just compress)
  {
    input: rootDir + "/public/go-point-new.png",
    outputPng: rootDir + "/public/go-point-new.png",
    outputWebp: rootDir + "/public/go-point-new.webp"
  },
  {
    input: rootDir + "/public/Pinelabs.png",
    outputPng: rootDir + "/public/Pinelabs.png",
    outputWebp: rootDir + "/public/Pinelabs.webp"
  },
  {
    input: rootDir + "/public/authorised-certificate.jpeg",
    outputJpg: rootDir + "/public/authorised-certificate.jpeg",
    outputWebp: rootDir + "/public/authorised-certificate.webp"
  },
  // 5. PWA manifest logos (Specific requirements, resize to exact manifest dimensions, compress)
  {
    input: rootDir + "/public/logo192.png",
    outputPng: rootDir + "/public/logo192.png",
    width: 192,
    height: 192
  },
  {
    input: rootDir + "/public/logo512.png",
    outputPng: rootDir + "/public/logo512.png",
    width: 512,
    height: 512
  }
];

console.log("\n--- IMAGE RESIZING & OPTIMIZATION REPORT ---\n");

for (const img of images) {
  try {
    const buffer = readFileSync(img.input);
    const beforeBytes = statSync(img.input).size;
    const meta = await sharp(buffer).metadata();
    
    let pipeline = sharp(buffer);
    if (img.width && img.height) {
      pipeline = pipeline.resize(img.width, img.height, { fit: "contain" });
    }
    
    // Output formats
    if (img.outputPng) {
      await pipeline.clone().png({ palette: true, quality: 80, compressionLevel: 9 }).toFile(img.outputPng + ".tmp");
      const afterBytesPng = statSync(img.outputPng + ".tmp").size;
      const mustOverwrite = img.width && img.height;
      if (mustOverwrite || afterBytesPng < beforeBytes) {
        writeFileSync(img.outputPng, readFileSync(img.outputPng + ".tmp"));
        console.log(`PNG ${img.input.replace(/.*[\/\\]/, "")}: ${meta.width}x${meta.height} (${(beforeBytes/1024).toFixed(1)} KB) -> ${img.width || meta.width}x${img.height || meta.height} (${(afterBytesPng/1024).toFixed(1)} KB)`);
      } else {
        console.log(`PNG ${img.input.replace(/.*[\/\\]/, "")}: Kept original (${(beforeBytes/1024).toFixed(1)} KB) because optimized was larger (${(afterBytesPng/1024).toFixed(1)} KB)`);
      }
      const fs = await import("fs");
      fs.unlinkSync(img.outputPng + ".tmp");
    }
    
    if (img.outputJpg) {
      await pipeline.clone().jpeg({ quality: 80 }).toFile(img.outputJpg + ".tmp");
      const afterBytesJpg = statSync(img.outputJpg + ".tmp").size;
      const mustOverwrite = img.width && img.height;
      if (mustOverwrite || afterBytesJpg < beforeBytes) {
        writeFileSync(img.outputJpg, readFileSync(img.outputJpg + ".tmp"));
        console.log(`JPG ${img.input.replace(/.*[\/\\]/, "")}: ${meta.width}x${meta.height} (${(beforeBytes/1024).toFixed(1)} KB) -> ${img.width || meta.width}x${img.height || meta.height} (${(afterBytesJpg/1024).toFixed(1)} KB)`);
      } else {
        console.log(`JPG ${img.input.replace(/.*[\/\\]/, "")}: Kept original (${(beforeBytes/1024).toFixed(1)} KB) because optimized was larger (${(afterBytesJpg/1024).toFixed(1)} KB)`);
      }
      const fs = await import("fs");
      fs.unlinkSync(img.outputJpg + ".tmp");
    }
    
    if (img.outputWebp) {
      await pipeline.clone().webp({ quality: 80 }).toFile(img.outputWebp);
      const afterBytesWebp = statSync(img.outputWebp).size;
      console.log(`WEBP ${img.outputWebp.replace(/.*[\/\\]/, "")}: Created ${img.width || meta.width}x${img.height || meta.height} (${(afterBytesWebp/1024).toFixed(1)} KB)`);
    }
    
  } catch (err) {
    console.error(`Error processing ${img.input}:`, err);
  }
}

console.log("\nOptimization Complete!\n");