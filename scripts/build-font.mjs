// 把粉圓體（Huninn）縮小成「只含網站用到的字」的字型檔，網頁才不會載入 1 MB 以上的完整字型。
// npm run dev、npm run build 都會先自動執行這支程式；改了文字以後重新執行就會更新。
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import subsetFont from 'subset-font'

const require = createRequire(import.meta.url)
const fontkit = require('fontkit')
const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
// 找出資料夾裡（含子資料夾）檔名符合 pattern 的檔案
const walk = (dir, pattern) =>
  readdirSync(new URL(dir, root), { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(`${dir}${d.name}/`, pattern) : pattern.test(d.name) ? [dir + d.name] : [],
  )
const pkg = 'node_modules/@fontsource/huninn/'

// 1. 收集網站上可能出現的字：src 底下所有程式與資料檔裡的文字（註解不會出現在網頁上，先拿掉）
const ts = require('typescript')
const stripComments = (code) =>
  ts.transpileModule(code, { compilerOptions: { removeComments: true, jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ESNext } }).outputText
const code = walk('src/', /\.tsx?$/).map((f) => stripComments(read(f)))
// CSS 裡用 content: '…' 畫出來的字（例如分隔用的「・」）也要算進去
const cssContent = walk('src/', /\.css$/).flatMap((f) => [...read(f).matchAll(/content:\s*'([^']*)'/g)].map((m) => m[1]))
const chars = [...new Set([...code, ...cssContent].join(''))].filter((c) => c.codePointAt(0) >= 0x20).sort()

// 2. 主字型檔（繁中字集）有的字先放一起
const mainBuf = readFileSync(new URL(pkg + 'files/huninn-chinese-traditional-400-normal.woff2', root))
const main = fontkit.create(mainBuf)
const has = (font, c) => font.hasGlyphForCodePoint(c.codePointAt(0))
const inMain = chars.filter((c) => has(main, c))
const missing = chars.filter((c) => !has(main, c) && c !== ' ')

// 3. 主檔缺的字（多半是全形標點，例如「，」「：」）到套件的其他切片裡找
const slices = [...read(pkg + '400.css').matchAll(/files\/(huninn-\d+-400-normal\.woff2)/g)].map((m) => m[1])
const extra = new Map()
const notFound = []
for (const c of missing) {
  const file = slices.find((f) => has(fontkit.create(readFileSync(new URL(pkg + 'files/' + f, root))), c))
  if (!file) notFound.push(c)
  else extra.set(file, [...(extra.get(file) ?? []), c])
}

// 4. 切出字型檔，產生 CSS。後面的 @font-face 只負責補缺的字（unicode-range），瀏覽器會先用它們
const outDir = new URL('src/assets/fonts/', root)
mkdirSync(outDir, { recursive: true })
const faces = []
const mainSubset = await subsetFont(mainBuf, inMain.join(''), { targetFormat: 'woff2' })
writeFileSync(new URL('huninn-subset.woff2', outDir), mainSubset)
faces.push({ file: 'huninn-subset.woff2', range: null })
let extraBytes = 0
let i = 1
for (const [file, cs] of extra) {
  const buf = await subsetFont(readFileSync(new URL(pkg + 'files/' + file, root)), cs.join(''), { targetFormat: 'woff2' })
  const name = `huninn-subset-${i++}.woff2`
  writeFileSync(new URL(name, outDir), buf)
  extraBytes += buf.length
  faces.push({ file: name, range: cs.map((c) => 'U+' + c.codePointAt(0).toString(16)).join(',') })
}

const css = faces
  .map(
    (f) => `@font-face {
  font-family: 'Huninn';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/${f.file}') format('woff2');${f.range ? `\n  unicode-range: ${f.range};` : ''}
}`,
  )
  .join('\n')
writeFileSync(new URL('src/fonts.generated.css', root), `/* 自動產生，請不要手動修改。來源：scripts/build-font.mjs */\n${css}\n`)

console.log(
  `粉圓體：收錄 ${chars.length} 個字，主檔 ${(mainSubset.length / 1024).toFixed(1)} KB` +
    (extra.size ? `，另補 ${missing.length - notFound.length} 個標點（${(extraBytes / 1024).toFixed(1)} KB）` : '') +
    (notFound.length ? `；字型裡沒有：${notFound.join('')}` : ''),
)
