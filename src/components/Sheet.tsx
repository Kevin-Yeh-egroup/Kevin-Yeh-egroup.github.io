import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { reduceMotion } from '../lib/motion'
import { hashId, morphClose, morphOpen, SHEET_PREFIX, SheetContext, sheetIdFromHash, useSheet } from '../lib/sheet'
import { UiIcon } from './Icons'

// 點開才看的第二層內容：電腦是置中的卡片，手機是從下面滑上來的面板。
// 打開時網址會加上 #代號，可以直接分享；按瀏覽器的上一頁會關掉面板，不會離開網站。

export function SheetProvider({ children }: { children: ReactNode }) {
  // 網址一開始就帶著 #代號 時直接打開那個面板（不是面板的代號就什麼都不會開）
  const [openId, setOpenId] = useState<string | null>(hashId)
  const pushed = useRef(false)
  // 從哪張卡片點開的：關閉時圖片要縮回那裡
  const origin = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onPop = () => {
      pushed.current = false
      const next = sheetIdFromHash()
      if (next) setOpenId(next)
      else morphClose(origin.current, () => setOpenId(null))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const open = useCallback((id: string, from?: HTMLElement | null) => {
    if (hashId() !== id) {
      history.pushState({ sheet: id }, '', '#' + id)
      pushed.current = true
    }
    origin.current = from ?? null
    morphOpen(from, id, () => setOpenId(id))
  }, [])

  const close = useCallback(() => {
    if (pushed.current) {
      history.back()
    } else {
      history.replaceState(null, '', window.location.pathname + window.location.search)
      morphClose(origin.current, () => setOpenId(null))
    }
  }, [])

  return <SheetContext.Provider value={{ openId, open, close }}>{children}</SheetContext.Provider>
}

export function Sheet({
  id,
  label,
  children,
  onOpen,
  onClosed,
  className = '',
}: {
  id: string
  label: string
  children: ReactNode
  onOpen?: () => void
  onClosed?: () => void
  className?: string
}) {
  const { openId, close } = useSheet()
  const ref = useRef<HTMLDialogElement>(null)
  const isOpen = openId === id
  const drag = useRef<{ y: number; dy: number } | null>(null)
  const onOpenRef = useRef(onOpen)
  useEffect(() => {
    onOpenRef.current = onOpen
  })

  // 開、關都直接操作 <dialog>；關閉時先播 0.24 秒的收合動畫再真的關掉
  useLayoutEffect(() => {
    const d = ref.current
    if (!d) return
    if (isOpen) {
      d.classList.remove('closing', 'dismissing')
      d.style.transform = ''
      if (!d.open) {
        d.showModal()
        document.documentElement.classList.add('sheet-open')
        d.querySelector('.sheet-scroll')?.scrollTo(0, 0)
        onOpenRef.current?.()
      }
      return
    }
    if (!d.open) return
    d.classList.remove('morphed')
    const finish = () => {
      d.classList.remove('closing', 'dismissing')
      d.style.transform = ''
      d.close()
    }
    // 減少動態，或圖片正要縮回卡片（View Transition 會處理動畫）：直接關
    if (reduceMotion() || document.documentElement.classList.contains('vt-closing')) {
      finish()
      return
    }
    // 往下拉關掉的：面板已經在往下滑了，等它滑完就好
    if (!d.classList.contains('dismissing')) d.classList.add('closing')
    const timer = window.setTimeout(finish, 260)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  // 放開手指：拉得夠遠就順著往下滑出去並關掉，不夠遠就彈回原位
  const endDrag = (dy: number) => {
    drag.current = null
    const d = ref.current
    if (!d) return
    d.classList.remove('dragging')
    if (dy > 110) {
      d.classList.add('dismissing')
      d.style.transform = 'translateY(100%)'
      close()
    } else {
      d.style.transform = ''
    }
  }

  return (
    <dialog
      ref={ref}
      id={SHEET_PREFIX + id}
      className={`sheet ${className}`}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClose={() => {
        document.documentElement.classList.remove('sheet-open')
        onClosed?.()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="sheet-inner">
        {/* 手機上可以抓住上緣往下拉來關掉 */}
        <div
          className="sheet-bar"
          onPointerDown={(e) => {
            if (window.innerWidth >= 720 || (e.target as HTMLElement).closest('button')) return
            drag.current = { y: e.clientY, dy: 0 }
            e.currentTarget.setPointerCapture(e.pointerId)
            ref.current?.classList.add('dragging')
          }}
          onPointerMove={(e) => {
            if (!drag.current || !ref.current) return
            drag.current.dy = Math.max(0, e.clientY - drag.current.y)
            ref.current.style.transform = `translateY(${drag.current.dy}px)`
          }}
          onPointerUp={() => endDrag(drag.current?.dy ?? 0)}
          onPointerCancel={() => endDrag(0)}
        >
          <span className="sheet-grabber" aria-hidden="true" />
          <button type="button" className="sheet-close" onClick={close} aria-label="關閉">
            <UiIcon name="close" />
          </button>
        </div>
        <div className="sheet-scroll">{children}</div>
      </div>
    </dialog>
  )
}
