import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

async function loadLatestDailyIssue() {
  try {
    const source = new URL('./public/tech-creative-daily/content.js', import.meta.url)
    const { ARCHIVE } = await import(source.href)
    const issue = ARCHIVE?.[0] as Record<string, unknown> | undefined
    const { id, date, read, title, one } = issue ?? {}
    if (
      typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id) ||
      typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      typeof read !== 'string' || !read.trim() ||
      typeof title !== 'string' || !title.trim() ||
      typeof one !== 'string' || !one.trim()
    ) return null

    const day = new Date(`${date}T00:00:00Z`)
    if (Number.isNaN(day.getTime()) || day.toISOString().slice(0, 10) !== date) return null
    return { id, date, read, title, one }
  } catch (error) {
    console.warn('讀不到日報資料，首頁將連到日報首頁。', error)
    return null
  }
}

// base './'：所有檔案用相對路徑，放在 kevin-yeh-egroup.github.io 或任何預覽網址都能正常顯示。
export default defineConfig(async () => ({
  base: './',
  plugins: [react()],
  define: { __LATEST_DAILY_ISSUE__: JSON.stringify(await loadLatestDailyIssue()) },
  build: {
    rolldownOptions: {
      input: [fileURLToPath(new URL('./index.html', import.meta.url)), fileURLToPath(new URL('./workbench/index.html', import.meta.url))],
    },
  },
}))
