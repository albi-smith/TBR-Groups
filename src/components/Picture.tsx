import React from 'react';
import Image from 'next/image';
import imageDimensions from '../data/imageDimensions.json';

interface Dim {
  w: number;
  h: number;
}

const DIMS: Record<string, Dim> = imageDimensions.byPath;
const FILE_DIMS: Record<string, Dim> = imageDimensions.byFile;

interface PictureProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string | any;
  webp?: string | any;
  avif?: string | any;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onError?: React.ReactEventHandler<HTMLImageElement>;
  width?: number;
  height?: number;
}

function getSrcString(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (typeof source === 'object' && source.src) return source.src;
  return '';
}

function swapExt(src: string, ext: string): string | null {
  if (!src || typeof src !== 'string') return null;
  if (src.startsWith('data:') || src.startsWith('http')) return null;
  return src.replace(/\.(jpe?g|png|webp|avif)$/i, `.${ext}`);
}

function lookupDims(srcStr: string): Dim | null {
  if (!srcStr) return null;
  if (DIMS[srcStr]) return DIMS[srcStr];
  const base = srcStr.split('/').pop() || '';
  if (FILE_DIMS[base]) return FILE_DIMS[base];
  return null;
}

function placeholderDims(srcStr: string): Dim | null {
  const match = /via\.placeholder\.com\/(\d+)x(\d+)/.exec(srcStr);
  return match ? { w: Number(match[1]), h: Number(match[2]) } : null;
}

export default function Picture({
  src,
  webp,
  avif,
  alt = '',
  className,
  style,
  loading,
  fetchPriority,
  onError,
  width,
  height,
  ...rest
}: PictureProps) {
  const srcStr = getSrcString(src);
  if (!srcStr) return null;

  // Pick the best existing format variant (avif > webp > original). The original
  // used <picture>; <Image> can only emit one source, so prefer avif for modern
  // browsers. Only switch when the variant is confirmed present in the dims map.
  let effectiveSrc = srcStr;
  let dims = lookupDims(srcStr);

  if (!srcStr.startsWith('data:') && !srcStr.startsWith('http')) {
    const candidates = [
      getSrcString(avif),
      getSrcString(webp),
      swapExt(srcStr, 'avif'),
      swapExt(srcStr, 'webp'),
    ].filter(Boolean) as string[];

    for (const candidate of candidates) {
      const candidateDims = lookupDims(candidate);
      if (candidateDims) {
        effectiveSrc = candidate;
        dims = candidateDims;
        break;
      }
    }
  }

  const fallbackDims = placeholderDims(srcStr);
  const imgWidth = width ?? dims?.w ?? fallbackDims?.w;
  const imgHeight = height ?? dims?.h ?? fallbackDims?.h;

  const isCritical = fetchPriority === 'high';
  const imgLoading = loading ?? (isCritical ? 'eager' : 'lazy');

  // data: URLs and anything with unknown dimensions cannot drive <Image>
  // (Next requires explicit width/height) — fall back to a plain <img>.
  if (srcStr.startsWith('data:') || !imgWidth || !imgHeight) {
    return (
      <img
        src={srcStr}
        alt={alt}
        className={className}
        style={style}
        loading={imgLoading}
        fetchPriority={fetchPriority}
        onError={onError}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={effectiveSrc}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      className={className}
      style={style}
      loading={imgLoading}
      fetchPriority={fetchPriority}
      onError={onError}
      {...rest}
    />
  );
}
