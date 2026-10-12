import { isTodo, type Text } from '../data/profile'

// 預覽版（npm run dev、npm run build:preview）顯示「待補」；正式網站隱藏。
export const SHOW_TODO = import.meta.env.DEV || import.meta.env.VITE_SHOW_TODO === '1'

// 正式網站要不要顯示這個值：待補的項目在正式網站整個不出現。
export const visible = (value: Text | undefined): boolean =>
  value !== undefined && (!isTodo(value) || SHOW_TODO)

// 這個值是不是已經填好的文字。
export const filled = (value: Text | undefined): value is string => typeof value === 'string'
