// 列出 src/data/profile.ts 裡還沒補的項目：npm run todo
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/data/profile.ts', import.meta.url), 'utf8')
const lines = source.split('\n')
const found = []

lines.forEach((line, index) => {
  for (const match of line.matchAll(/todo\('([^']+)'\)/g)) {
    found.push({ line: index + 1, what: match[1] })
  }
})

if (found.length === 0) {
  console.log('內容都補齊了。')
} else {
  console.log(`還有 ${found.length} 項待補（src/data/profile.ts）：`)
  for (const item of found) console.log(`  第 ${item.line} 行：${item.what}`)
}
