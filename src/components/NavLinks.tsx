import { useLayoutEffect, useRef } from 'react'

type Item = { id: string; label: string }

// 選單：目前所在的區塊底下有一顆膠囊，捲動時滑到對應的項目（跟分段切換同一種手感）
export function NavLinks({ items, active, className, label }: { items: Item[]; active: string | null; className: string; label: string }) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const nav = ref.current
    if (!nav) return
    const place = () => {
      const link = nav.querySelector<HTMLElement>('a[aria-current="true"]')
      nav.classList.toggle('has-active', !!link)
      if (!link) return
      nav.style.setProperty('--x', `${link.offsetLeft}px`)
      nav.style.setProperty('--w', `${link.offsetWidth}px`)
    }
    place()
    // 字型載入或視窗大小改變時，項目寬度會變，重新量一次
    const ro = new ResizeObserver(place)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [active])

  return (
    <nav ref={ref} className={className} aria-label={label}>
      <span className="nav-thumb" aria-hidden="true" />
      {items.map((n) => (
        <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}>
          {n.label}
        </a>
      ))}
    </nav>
  )
}
