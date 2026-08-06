/**
 * Responsive picture with AVIF → WebP → original fallback.
 * Critical images (above-fold logos/heroes) should pass fetchPriority="high"
 * and omit loading (defaults to eager). All others get loading="lazy".
 */
function swapExt(src, ext) {
  if (!src || typeof src !== "string") return null;
  if (src.startsWith("data:") || src.startsWith("http")) return null;
  return src.replace(/\.(jpe?g|png|webp|avif)$/i, `.${ext}`);
}

export default function Picture({
  src,
  webp,
  avif,
  alt = "",
  className,
  style,
  loading,
  fetchPriority,
  onError,
  ...rest
}) {
  if (!src) return null;

  const isRemote = typeof src === "string" && (src.startsWith("http") || src.startsWith("data:"));
  const webpSrc = webp ?? swapExt(src, "webp");
  const avifSrc = avif ?? swapExt(src, "avif");
  const isCritical = fetchPriority === "high";
  const imgLoading = loading ?? (isCritical ? "eager" : "lazy");

  if (isRemote) {
    return (
      <img
        src={src}
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
    <picture>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={imgLoading}
        fetchPriority={fetchPriority}
        onError={onError}
        {...rest}
      />
    </picture>
  );
}
