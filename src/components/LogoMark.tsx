// 新芽 Y 標誌（小尺寸版：沒有葉脈、莖加粗）。顏色跟著網站的海色和蛋黃色，深色模式自動切換。
// 完整版與動態版放在 brand/，規則寫在 DESIGN.md。
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="12 13.5 84 84" aria-hidden="true" focusable="false">
      <path className="logo-stem" d="M50 90 L50 54" />
      <g className="logo-leaf">
        <path d="M52 52 C51.3 30.9 66.6 14.7 86 16 C88.4 35.3 73.1 51.5 52 52 Z" />
      </g>
      <path className="logo-sprout" d="M48 54 C32.1 54.3 19.5 42.6 20 28 C34.5 26.4 47.1 38.1 48 54 Z" />
    </svg>
  )
}
