// 把粉圓體（Huninn）縮小成「只含網站用到的字」的字型檔，網頁才不會載入 1 MB 以上的完整字型。
// npm run dev、npm run build 都會先自動執行這支程式；改了文字以後重新執行就會更新。
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import subsetFont from 'subset-font'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const list = (dir) => readdirSync(new URL(dir, root)).map((name) => dir + name)

// 1. 收集網站上可能出現的字：資料檔和所有元件裡的文字
const sources = ['src/data/profile.ts', 'src/App.tsx', ...list('src/sections/'), ...list('src/components/')]
const chars = [...new Set(sources.map(read).join(''))]
  .filter((c) => c.codePointAt(0) >= 0x20)
  .sort()
  .join('')

// 2. 從完整字型（中英文都在同一個檔）切出這些字
const source = readFileSync(new URL('node_modules/@fontsource/huninn/files/huninn-chinese-traditional-400-normal.woff2', root))
const subset = await subsetFont(source, chars, { targetFormat: 'woff2' })
mkdirSync(new URL('src/assets/fonts/', root), { recursive: true })
writeFileSync(new URL('src/assets/fonts/huninn-subset.woff2', root), subset)

// 3. 產生對應的 CSS
writeFileSync(
  new URL('src/fonts.generated.css', root),
  `/* 自動產生，請不要手動修改。來源：scripts/build-font.mjs */
@font-face {
  font-family: 'Huninn';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/huninn-subset.woff2') format('woff2');
}
`,
)

console.log(`粉圓體：收錄 ${chars.length} 個字，字型檔 ${(subset.length / 1024).toFixed(1)} KB`)
