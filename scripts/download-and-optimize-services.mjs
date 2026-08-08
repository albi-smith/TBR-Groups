import sharp from "sharp";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { servicesA, servicesB, allServices } from "../src/data/servicesData.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const destDir = resolve(__dirname, "../public/assets/images");
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

// Map to avoid downloading the same URL multiple times
const urlCache = new Map();
const credits = [];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function processImage(url, baseName, isHero) {
  if (!url || !url.startsWith("http")) return null;
  
  const cacheKey = `${url}_${isHero}`;
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey);
  }
  
  const width = isHero ? 1200 : 600;
  console.log(`Downloading: ${url} -> ${baseName} (width: ${width}px)`);
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Determine target format (jpeg/png/webp)
    // Most stock photos are jpegs unless they are custom designs or logos.
    // If the URL has .png or .webp in it, we can keep that, otherwise default to jpeg.
    const lowerUrl = url.toLowerCase();
    const isPng = lowerUrl.includes(".png") || lowerUrl.includes("logo");
    const ext = isPng ? "png" : "jpeg";
    
    const outputFileName = `${baseName}.${ext}`;
    const outputWebpName = `${baseName}.webp`;
    
    const outPath = resolve(destDir, outputFileName);
    const outWebpPath = resolve(destDir, outputWebpName);
    
    let pipeline = sharp(buffer);
    const meta = await pipeline.metadata();
    
    // Resize with aspect ratio
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
    
    // Output fallback format
    if (isPng) {
      await pipeline.clone().png({ palette: true, quality: 80, compressionLevel: 9 }).toFile(outPath);
    } else {
      await pipeline.clone().jpeg({ quality: 80 }).toFile(outPath);
    }
    
    // Output webp format
    await pipeline.clone().webp({ quality: 80 }).toFile(outWebpPath);
    
    const localFallbackPath = `/assets/images/${outputFileName}`;
    const localWebpPath = `/assets/images/${outputWebpName}`;
    
    const result = { image: localFallbackPath, imageWebp: localWebpPath };
    urlCache.set(cacheKey, result);
    
    // Record credits
    let source = "Unknown Stock Photo";
    if (url.includes("unsplash.com")) source = "Unsplash";
    else if (url.includes("pexels.com")) source = "Pexels";
    else if (url.includes("istockphoto.com")) source = "iStock";
    else if (url.includes("ftcdn.net")) source = "Adobe Stock / Fotolia";
    else if (url.includes("dreamstime.com")) source = "Dreamstime";
    
    credits.push(`- **${baseName}**: Original source [${source}](${url})`);
    
    return result;
  } catch (err) {
    console.error(`Failed to process image ${url}:`, err.message);
    return null;
  }
}

async function run() {
  const data = { servicesA: [], servicesB: [] };
  
  // 1. Process servicesA
  for (const s of servicesA) {
    const sSlug = slugify(s.title);
    const mainImg = await processImage(s.image, `${sSlug}`, false);
    const heroImg = await processImage(s.heroImage, `${sSlug}-hero`, true);
    
    const newService = {
      ...s,
      image: mainImg ? mainImg.image : s.image,
      imageWebp: mainImg ? mainImg.imageWebp : undefined,
      heroImage: heroImg ? heroImg.image : s.heroImage,
      heroImageWebp: heroImg ? heroImg.imageWebp : undefined,
      subServices: []
    };
    
    if (s.subServices) {
      for (const sub of s.subServices) {
        const subSlug = slugify(sub.name);
        const subImg = await processImage(sub.image, `${sSlug}-${subSlug}`, false);
        newService.subServices.push({
          ...sub,
          image: subImg ? subImg.image : sub.image,
          imageWebp: subImg ? subImg.imageWebp : undefined
        });
      }
    }
    data.servicesA.push(newService);
  }
  
  // 2. Process servicesB (if exists)
  const sourceB = servicesB || [];
  for (const s of sourceB) {
    const sSlug = slugify(s.title);
    const mainImg = await processImage(s.image, `${sSlug}`, false);
    const heroImg = await processImage(s.heroImage, `${sSlug}-hero`, true);
    
    const newService = {
      ...s,
      image: mainImg ? mainImg.image : s.image,
      imageWebp: mainImg ? mainImg.imageWebp : undefined,
      heroImage: heroImg ? heroImg.image : s.heroImage,
      heroImageWebp: heroImg ? heroImg.imageWebp : undefined,
      subServices: []
    };
    
    if (s.subServices) {
      for (const sub of s.subServices) {
        const subSlug = slugify(sub.name);
        const subImg = await processImage(sub.image, `${sSlug}-${subSlug}`, false);
        newService.subServices.push({
          ...sub,
          image: subImg ? subImg.image : sub.image,
          imageWebp: subImg ? subImg.imageWebp : undefined
        });
      }
    }
    data.servicesB.push(newService);
  }
  
  // Generate credits markdown
  const creditsMd = `# Image Credits & Attribution

This project uses stock photos from various sources self-hosted locally under the respective platform licenses.

## Attributions
${credits.join("\n")}
`;
  writeFileSync(resolve(__dirname, "../public/assets/images/credits.md"), creditsMd, "utf8");
  
  // Generate updated JS data file content
  const newJsContent = `// ============================================
// TBR Groups — Centralized Service Data (Optimized Local)
// ============================================

export const servicesA = ${JSON.stringify(data.servicesA, null, 2)};

export const servicesB = ${JSON.stringify(data.servicesB, null, 2)};

export const allServices = [...servicesA, ...servicesB];
`;
  writeFileSync(resolve(__dirname, "../src/data/servicesData.js"), newJsContent, "utf8");
  console.log("\nServices data file updated successfully with local optimized image paths!");
}

run();