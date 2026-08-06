import sharp from "sharp";
import { statSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const images = [
  { input: publicDir + "/go point new .png",           output: publicDir + "/go point new .webp",           quality: 80 },
  { input: publicDir + "/Pinelabs.png",                output: publicDir + "/Pinelabs.webp",                quality: 80 },
  { input: publicDir + "/Authorised certificate.jpeg", output: publicDir + "/Authorised certificate.webp",  quality: 80 },
  { input: publicDir + "/logo.png",                    output: publicDir + "/logo.webp",                    quality: 85 },
  { input: publicDir + "/tbrlogo.jpeg",                output: publicDir + "/tbrlogo.webp",                 quality: 85 },
];

console.log("\n TBR Image Optimizer\n" + "=".repeat(50));
let totalBefore = 0, totalAfter = 0;

for (const { input, output, quality } of images) {
  if (!existsSync(input)) { console.warn("Skipping (not found): " + input); continue; }
  const beforeBytes = statSync(input).size;
  totalBefore += beforeBytes;
  try {
    const img = sharp(input);
    const meta = await img.metadata();
    await img.webp({ quality }).toFile(output);
    const afterBytes = statSync(output).size;
    totalAfter += afterBytes;
    const reduction = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1);
    const name = input.replace(/.*[\/\\]/, "");
    console.log("OK " + name + " [" + meta.width + "x" + meta.height + "] Before: " + (beforeBytes/1024).toFixed(1) + " KB -> After: " + (afterBytes/1024).toFixed(1) + " KB (" + reduction + "% smaller)");
  } catch (err) { console.error("Failed: " + err.message); }
}

console.log("=".repeat(50));
console.log("Total before: " + (totalBefore/1024).toFixed(1) + " KB");
console.log("Total after:  " + (totalAfter/1024).toFixed(1) + " KB");
console.log("Total saved:  " + ((totalBefore-totalAfter)/1024).toFixed(1) + " KB (" + (((totalBefore-totalAfter)/totalBefore)*100).toFixed(1) + "%)");
console.log("Done!");