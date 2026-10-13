import type { ReactNode } from 'react'
import type { IconKind } from '../data/profile'

// 經歷用的小插圖：扁平、兩三個顏色，跟介紹影片同一套
export function LifeIcon({ kind, size = 64 }: { kind: IconKind; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false" className="life-icon">
      {ICONS[kind]}
    </svg>
  )
}

const ICONS: Record<IconKind, ReactNode> = {
  cap: (
    <>
      <path d="M50 22 L92 40 L50 58 L8 40 Z" className="i-sea" />
      <path d="M26 49 L26 66 C26 74 74 74 74 66 L74 49 L50 60 Z" className="i-sea-deep" />
      <path d="M86 43 L86 64" className="i-yolk-line" strokeWidth={4} strokeLinecap="round" />
      <circle cx={86} cy={67} r={5} className="i-yolk" />
    </>
  ),
  shield: (
    <>
      <path d="M50 12 L82 24 L82 48 C82 68 68 82 50 90 C32 82 18 68 18 48 L18 24 Z" className="i-sea" />
      <path d="M35 50 L46 61 L67 39" fill="none" className="i-paper-line" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={78} cy={20} r={7} className="i-yolk" />
    </>
  ),
  laptop: (
    <>
      <rect x={18} y={22} width={64} height={44} rx={6} className="i-sea" />
      <rect x={24} y={28} width={52} height={32} rx={3} className="i-paper" />
      <rect x={30} y={46} width={7} height={10} rx={2} className="i-mint" />
      <rect x={41} y={40} width={7} height={16} rx={2} className="i-mint" />
      <rect x={52} y={34} width={7} height={22} rx={2} className="i-yolk" />
      <rect x={63} y={43} width={7} height={13} rx={2} className="i-mint" />
      <path d="M8 70 L92 70 L86 78 L14 78 Z" className="i-sea-deep" />
    </>
  ),
  egg: (
    <>
      <ellipse cx={50} cy={64} rx={42} ry={18} className="i-plate" />
      <path d="M22 60 C18 44 36 34 50 38 C62 30 82 36 82 50 C90 60 76 72 58 70 C44 76 26 72 22 60 Z" className="i-white" />
      <ellipse cx={52} cy={52} rx={14} ry={12} className="i-yolk" />
      <ellipse cx={47} cy={48} rx={4.5} ry={3} className="i-yolk-light" />
    </>
  ),
  book: (
    <>
      <path d="M50 34 C38 28 22 28 10 32 L10 76 C22 72 38 72 50 78 Z" className="i-paper i-outline" />
      <path d="M50 34 C62 28 78 28 90 32 L90 76 C78 72 62 72 50 78 Z" className="i-paper i-outline" />
      <path d="M50 30 L50 14" className="i-sea-line" strokeWidth={5} strokeLinecap="round" />
      <path d="M51 15 C51 6 59 1 68 2 C68 11 61 16 51 15 Z" className="i-sea" />
      <path d="M49 18 C41 18 35 12 36 5 C44 5 49 10 49 18 Z" className="i-yolk" />
    </>
  ),
  heart: (
    <>
      <path d="M50 14 L88 44 L80 44 L80 86 L20 86 L20 44 L12 44 Z" className="i-sea" />
      <path d="M50 76 C36 66 30 60 30 52 C30 46 34 42 40 42 C44 42 48 45 50 48 C52 45 56 42 60 42 C66 42 70 46 70 52 C70 60 64 66 50 76 Z" className="i-yolk" />
    </>
  ),
  people: (
    <>
      <circle cx={26} cy={40} r={11} className="i-mint" />
      <path d="M8 84 C8 64 15 56 26 56 C37 56 44 64 44 84 Z" className="i-mint" />
      <circle cx={74} cy={40} r={11} className="i-yolk" />
      <path d="M56 84 C56 64 63 56 74 56 C85 56 92 64 92 84 Z" className="i-yolk" />
      <circle cx={50} cy={32} r={13} className="i-sea" />
      <path d="M28 86 C28 62 37 50 50 50 C63 50 72 62 72 86 Z" className="i-sea" />
    </>
  ),
  sprout: (
    <>
      <path d="M40 90 L40 58" className="i-sea-line" strokeWidth={8} strokeLinecap="round" />
      <path d="M42 56 C41.4 37 55 22 72 23 C74 40 60 55 42 56 Z" className="i-sea" />
      <path d="M38 58 C24 58 13 48 13 35 C26 34 37 44 38 58 Z" className="i-yolk" />
      <path d="M66 62 L90 62 C94 62 96 64 96 68 L96 80 C96 84 94 86 90 86 L78 86 L70 94 L70 86 L66 86 C62 86 60 84 60 80 L60 68 C60 64 62 62 66 62 Z" className="i-paper i-outline" />
      <circle cx={70} cy={74} r={2.6} className="i-sea" />
      <circle cx={78} cy={74} r={2.6} className="i-sea" />
      <circle cx={86} cy={74} r={2.6} className="i-yolk" />
    </>
  ),
  chat: (
    <>
      <path d="M14 22 H62 C67 22 70 25 70 30 V54 C70 59 67 62 62 62 H34 L22 74 V62 H14 C9 62 6 59 6 54 V30 C6 25 9 22 14 22 Z" className="i-sea" />
      <rect x={18} y={34} width={36} height={6} rx={3} className="i-white-flat" />
      <rect x={18} y={46} width={24} height={6} rx={3} className="i-white-flat" />
      <path d="M44 48 H86 C90 48 94 51 94 56 V76 C94 81 90 84 86 84 H82 V94 L72 84 H44 C39 84 36 81 36 76 V56 C36 51 39 48 44 48 Z" className="i-yolk" />
      <path d="M52 66 L60 74 L78 58" fill="none" className="i-ink-line" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  map: (
    <>
      <path d="M8 26 L34 16 L66 28 L92 18 V74 L66 84 L34 72 L8 82 Z" className="i-paper i-outline" />
      <path d="M34 16 V72 M66 28 V84" className="i-sea-line" strokeWidth={3} opacity={0.5} />
      <path d="M50 70 C40 56 34 48 34 39 C34 30 41 23 50 23 C59 23 66 30 66 39 C66 48 60 56 50 70 Z" className="i-yolk" />
      <circle cx={50} cy={39} r={7} className="i-white-flat" />
    </>
  ),
  mic: (
    <>
      <rect x={36} y={10} width={28} height={50} rx={14} className="i-sea" />
      <path d="M24 44 C24 60 36 70 50 70 C64 70 76 60 76 44" fill="none" className="i-sea-line" strokeWidth={6} strokeLinecap="round" />
      <path d="M50 70 V84 M36 88 H64" className="i-sea-line" strokeWidth={6} strokeLinecap="round" />
      <path d="M82 22 C88 28 88 40 82 46 M90 14 C100 26 100 42 90 54" fill="none" className="i-yolk-line" strokeWidth={5} strokeLinecap="round" />
    </>
  ),
}

// 介面用的小圖示
export function UiIcon({ name, size = 20 }: { name: 'play' | 'close' | 'arrow' | 'external' | 'award' | 'plus' | 'down' | 'replay' | 'check'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false } as const
  switch (name) {
    case 'play':
      return (
        <svg {...common}>
          <path d="M8 5.5 L19 12 L8 18.5 Z" fill="currentColor" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'external':
      return (
        <svg {...common}>
          <path d="M8 16 L17 7 M9 7 H17 V15" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'award':
      return (
        <svg {...common}>
          <path d="M7 4 H17 V9 C17 12 15 14 12 14 C9 14 7 12 7 9 Z" fill="currentColor" />
          <path d="M7 6 H4 C4 9 5 10.5 7.5 10.8 M17 6 H20 C20 9 19 10.5 16.5 10.8" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M12 14 V18 M8 20 H16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 6 V18 M6 12 H18" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      )
    case 'down':
      return (
        <svg {...common}>
          <path d="M6 9 L12 15 L18 9" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'replay':
      return (
        <svg {...common}>
          <path d="M5 12 A7 7 0 1 0 8 6.3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M8 2.5 V6.5 H4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}
