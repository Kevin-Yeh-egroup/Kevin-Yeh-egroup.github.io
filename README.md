# 葉先博 Kevin｜個人網站

我會的，你也可以會。

- 網站：https://kevin-yeh-egroup.github.io/
- 設計規則：[DESIGN.md](DESIGN.md)

## 改內容

網站上所有文字都在 `src/data/profile.ts`，只改這個檔案就好，版面會自動跟著更新。

還沒確定的地方寫成 `todo('要補什麼')`：預覽版會顯示「待補」，正式網站自動隱藏。執行 `npm run todo` 可以列出還沒補的項目。

## 在自己的電腦上看

需要先安裝 [Node.js](https://nodejs.org/)（22 版以上）。

```sh
npm install
npm run dev
```

打開終端機顯示的網址（通常是 http://localhost:5173 ），改完存檔，畫面會自動更新。

## 上線

推到 `main` 之後，GitHub Actions 會自動檢查、建置，再發布到 https://kevin-yeh-egroup.github.io/ ，通常幾分鐘內完成。進度可以在 repo 的「Actions」分頁看到。

## 檔案在哪裡

| 檔案 | 用途 |
| --- | --- |
| `src/data/profile.ts` | 網站上所有文字、連結、照片設定 |
| `src/sections/` | 每一個區塊的版面（首屏、我走過的路、一起學、作品、關於我、經歷與證照、聯絡） |
| `src/styles.css` | 顏色、字體、間距 |
| `public/images/` | 照片 |
| `brand/` | 新芽 Y 標誌的正式檔（SVG、PNG、動態版），規則寫在 DESIGN.md |
| `public/favicon.svg` 等 | 瀏覽器分頁、手機主畫面用的小圖示 |
| `scripts/build-font.mjs` | 把粉圓體縮小成只含網站用到的字 |
| `scripts/list-todos.mjs` | 列出還沒補的內容 |
| `.github/workflows/deploy.yml` | 自動發布的設定 |

## 其他指令

| 指令 | 做什麼 |
| --- | --- |
| `npm run build` | 建置正式網站到 `dist/` |
| `npm run build:preview` | 建置含「待補」標籤的預覽版 |
| `npm run preview` | 在本機看建置好的網站 |
| `npm run lint` | 檢查程式碼 |
| `npm run todo` | 列出還沒補的內容 |
