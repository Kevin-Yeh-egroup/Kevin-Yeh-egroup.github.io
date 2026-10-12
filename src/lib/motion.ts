import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const REDUCE = '(prefers-reduced-motion: reduce)'

// 使用者在系統開了「減少動態」：動畫改成直接顯示或淡入
export const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia(REDUCE).matches

// 同上，但做成 React 會跟著更新的值（使用者中途改設定也會反應）
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
export const useReducedMotion = () => useSyncExternalStore(subscribeReduce, reduceMotion, () => true)

// 元素進到畫面時回傳 true（只觸發一次）。不支援的瀏覽器直接當作已經看到
export function useInView<T extends Element>(rootMargin = '0px 0px -15% 0px') {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, seen] as const
}

// 數字進到畫面時從 0 跑到目標值；減少動態或 enabled 為 false 時直接顯示目標值
export function useCountUp(target: number, inView: boolean, enabled = true, duration = 1100) {
  const [animate] = useState(() => enabled && target > 0 && !reduceMotion())
  const [value, setValue] = useState(animate ? 0 : target)
  useEffect(() => {
    if (!animate || !inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // 分頁在背景時畫面不會更新：時間到了直接顯示最後的數字
    const done = window.setTimeout(() => setValue(target), duration + 400)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(done)
    }
  }, [animate, inView, target, duration])
  return value
}

// 目前看到哪一個區塊（頁首選單用）
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return active
}
