import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Guide, GuideSummary } from '../types';

// ─────────────────────────────────────────────────────────────
// Guides content layer.
//
// Articles live as Markdown files with YAML frontmatter in
//   src/data/guides/*.md
// File conventions:
//   - `_`-prefixed and dot-files are IGNORED (e.g. `_template.md`).
//   - `draft: true` in frontmatter excludes the article from the
//     listing and from static generation.
//   - `slug` may be set in frontmatter; otherwise the filename is
//     used (lowercased, spaces/dashes → hyphens).
//
// NOTE: rendered markdown is inserted with dangerouslySetInnerHTML.
// Content is trusted local source, authored and committed by the
// site owner — never render untrusted input through this pipeline.
// ─────────────────────────────────────────────────────────────

const GUIDES_DIR = path.join(process.cwd(), 'src', 'data', 'guides');
const WORDS_PER_MINUTE = 200;

marked.setOptions({ gfm: true, breaks: false });

function listGuideFiles(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .filter((file) => !file.startsWith('_') && !file.startsWith('.'));
}

function computeReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function slugFromFile(fileName: string, frontmatterSlug?: string): string {
  if (frontmatterSlug && frontmatterSlug.trim()) {
    return frontmatterSlug.trim();
  }
  return fileName
    .replace(/\.(md|mdx)$/i, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toIsoDate(value: unknown): string | null {
  if (typeof value !== 'string' && !(value instanceof Date)) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function parseGuideFile(fileName: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  const title = typeof data.title === 'string' && data.title.trim() ? data.title.trim() : null;
  const description =
    typeof data.description === 'string' && data.description.trim() ? data.description.trim() : null;
  const date = toIsoDate(data.date);
  if (!title || !description || !date) return null;

  const tags = Array.isArray(data.tags)
    ? data.tags.map(String).filter(Boolean)
    : typeof data.tags === 'string'
      ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

  const summary: GuideSummary = {
    slug: slugFromFile(fileName, typeof data.slug === 'string' ? data.slug : undefined),
    title,
    description,
    date,
    updated: toIsoDate(data.updated) ?? undefined,
    category: typeof data.category === 'string' ? data.category : undefined,
    tags,
    author: typeof data.author === 'string' ? data.author : undefined,
    image: typeof data.image === 'string' ? data.image : undefined,
    imageWebp: typeof data.imageWebp === 'string' ? data.imageWebp : undefined,
    imageAlt: typeof data.imageAlt === 'string' ? data.imageAlt : undefined,
    readingMinutes: computeReadingMinutes(content),
  };

  return {
    ...summary,
    content,
    html: marked.parse(content, { async: false }) as string,
  };
}

// All published guides, newest first. Summaries only (no body HTML).
export function getAllGuides(): GuideSummary[] {
  return listGuideFiles()
    .map((file) => parseGuideFile(file))
    .filter((guide): guide is Guide => guide !== null)
    .map(({ content, html, ...summary }) => summary as GuideSummary)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

// Full guide (with rendered HTML) for the article page, or null if missing.
export function getGuideBySlug(slug: string): Guide | null {
  for (const file of listGuideFiles()) {
    const guide = parseGuideFile(file);
    if (guide && guide.slug === slug) return guide;
  }
  return null;
}