import { useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'

// 分段切換：一次只看一種內容。底下的膠囊會滑到選中的那一格。
// idBase 用 useId() 產生，同時傳給 Segmented 和 SegPanel，讓輔助工具知道哪個按鈕控制哪塊內容。
export function Segmented<T extends string>({
  items,
  value,
  onChange,
  label,
  idBase,
  size = 'md',
}: {
  items: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  label: string
  idBase: string
  size?: 'sm' | 'md'
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const index = Math.max(0, items.findIndex((it) => it.id === value))
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (index + step + items.length) % items.length
    onChange(items[next].id)
    refs.current[next]?.focus()
  }
  return (
    <div
      className={`seg seg-${size}`}
      role="tablist"
      aria-label={label}
      style={{ '--n': items.length, '--i': index } as CSSProperties}
      onKeyDown={onKey}
    >
      <span className="seg-thumb" aria-hidden="true" />
      {items.map((it, i) => (
        <button
          key={it.id}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          role="tab"
          id={`${idBase}-${it.id}-tab`}
          aria-selected={it.id === value}
          aria-controls={`${idBase}-${it.id}-panel`}
          tabIndex={it.id === value ? 0 : -1}
          onClick={() => onChange(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

// 跟著分段切換的內容：只顯示選中的那一塊，切換時淡入
export function SegPanel({ idBase, id, show, children, className = '' }: { idBase: string; id: string; show: boolean; children: ReactNode; className?: string }) {
  return (
    <div role="tabpanel" id={`${idBase}-${id}-panel`} aria-labelledby={`${idBase}-${id}-tab`} hidden={!show} className={`seg-panel ${className}`}>
      {show ? children : null}
    </div>
  )
}
