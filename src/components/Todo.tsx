import { isTodo, type Text } from '../data/profile'
import { SHOW_TODO } from '../lib/todo'

export function TodoMark({ what }: { what: string }) {
  if (!SHOW_TODO) return null
  return <span className="todo">待補：{what}</span>
}

// 文字是待補時顯示待補標記，否則顯示文字本身。
export function T({ value }: { value: Text }) {
  if (isTodo(value)) return <TodoMark what={value.todo} />
  return <>{value}</>
}
