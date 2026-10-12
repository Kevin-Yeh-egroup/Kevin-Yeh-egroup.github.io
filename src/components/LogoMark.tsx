// 新芽 Y 標誌。顏色跟著網站的海色和蛋黃色，深色模式自動切換。
// 完整版與動態版的檔案放在 brand/，規則寫在 DESIGN.md。

const STEM = 'M50 90 L50 54'
const LEAF = 'M52 52 C51.3 30.9 66.6 14.7 86 16 C88.4 35.3 73.1 51.5 52 52 Z'
const MIDRIB = 'M55.808 49.746 L79.808 23.746 A1.1 1.1 0 0 0 78.192 22.254 L54.192 48.254 A1.1 1.1 0 0 0 55.808 49.746 Z'
const SPROUT = 'M48 54 C32.1 54.3 19.5 42.6 20 28 C34.5 26.4 47.1 38.1 48 54 Z'

// 小尺寸版：沒有葉脈、莖加粗（頁首用）
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="12 13.5 84 84" aria-hidden="true" focusable="false">
      <path className="logo-stem" d={STEM} />
      <g className="logo-leaf">
        <path d={LEAF} />
      </g>
      <path className="logo-sprout" d={SPROUT} />
    </svg>
  )
}

// 會長出來的大新芽：種子冒出 → 莖往上長 → 大葉展開輕晃 → 黃色新芽跳出（約 1.6 秒，只播一次）
// play 由 CSS class 控制：.sprout-grow 在畫面載入時播放；.sprout-scroll 跟著捲動長出來
export function GrowingSprout({ className = '', label }: { className?: string; label?: string }) {
  return (
    <svg
      className={`sprout ${className}`}
      viewBox="0 0 100 100"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path className="sprout-stem" d={STEM} pathLength={36} />
      <g className="sprout-sway">
        <path className="sprout-leaf" d={`${LEAF} ${MIDRIB}`} fillRule="evenodd" />
      </g>
      <path className="sprout-bud" d={SPROUT} />
    </svg>
  )
}
