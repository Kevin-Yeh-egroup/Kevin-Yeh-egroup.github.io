// 依螢幕大小載入合適寬度的 WebP，寬高先寫好，載入時版面不會跳動
export function Picture({
  base,
  widths = [640, 1080, 1600],
  sizes,
  alt,
  width,
  height,
  eager = false,
  className,
}: {
  base: string
  widths?: number[]
  sizes: string
  alt: string
  width: number
  height: number
  eager?: boolean
  className?: string
}) {
  const srcSet = widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')
  return (
    <img
      className={className}
      src={`${base}-${widths[Math.min(1, widths.length - 1)]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
