import { createContext, useContext } from 'react'
import { flushSync } from 'react-dom'
import { reduceMotion } from './motion'

// 面板（點開才看的第二層）共用的狀態與工具；元件本身在 components/Sheet.tsx

export type SheetApi = {
  openId: string | null
  open: (id: string, origin?: HTMLElement | null) => void
  close: () => void
}

export const SheetContext = createContext<SheetApi>({ openId: null, open: () => {}, close: () => {} })
export const useSheet = () => useContext(SheetContext)

// 面板在頁面上的 id 是「sheet-代號」，網址上的 #代號 對應到它
export const SHEET_PREFIX = 'sheet-'

export const hashId = () => decodeURIComponent(window.location.hash.slice(1)) || null

export function sheetIdFromHash() {
  const id = hashId()
  return id && document.getElementById(SHEET_PREFIX + id) ? id : null
}

const canMorph = () => typeof document.startViewTransition === 'function' && !reduceMotion()
const mediaOf = (origin: HTMLElement | null | undefined) =>
  origin?.closest('[data-morph-root]')?.querySelector<HTMLElement>('[data-morph]') ?? null

// 打開：卡片上的圖片「長成」面板上的圖片（瀏覽器支援 View Transitions 時）
export function morphOpen(origin: HTMLElement | null | undefined, id: string, update: () => void) {
  const media = mediaOf(origin)
  if (!media || !canMorph()) {
    update()
    return
  }
  const html = document.documentElement
  media.style.viewTransitionName = 'sheet-media'
  html.classList.add('vt-sheet')
  const t = document.startViewTransition(() => {
    media.style.viewTransitionName = ''
    flushSync(update)
    // 已經用長出來的方式打開了，面板本身不再播一次進場動畫
    document.getElementById(SHEET_PREFIX + id)?.classList.add('morphed')
  })
  t.finished.finally(() => html.classList.remove('vt-sheet'))
}

// 關閉：面板上的圖片縮回原本那張卡片（面板內容往下捲過時就用一般的收合動畫）
export function morphClose(origin: HTMLElement | null | undefined, update: () => void) {
  const media = mediaOf(origin)
  const dialog = document.querySelector<HTMLDialogElement>('dialog.sheet[open]')
  const scrolled = (dialog?.querySelector('.sheet-scroll')?.scrollTop ?? 0) > 40
  const dragged = dialog?.classList.contains('dismissing') ?? false
  if (!media || !media.isConnected || !dialog?.querySelector('[data-morph-target]') || scrolled || dragged || !canMorph()) {
    update()
    return
  }
  const html = document.documentElement
  html.classList.add('vt-sheet', 'vt-closing')
  const t = document.startViewTransition(() => {
    media.style.viewTransitionName = 'sheet-media'
    flushSync(update)
  })
  t.finished.finally(() => {
    media.style.viewTransitionName = ''
    html.classList.remove('vt-sheet', 'vt-closing')
  })
}

// 會打開面板的按鈕：記住是從哪張卡片點開的，好讓圖片接著長過去
export function useOpenSheet(id: string) {
  const { open } = useSheet()
  return (e: { currentTarget: HTMLElement }) => open(id, e.currentTarget)
}
