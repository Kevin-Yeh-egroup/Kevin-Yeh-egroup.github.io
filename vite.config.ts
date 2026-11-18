import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// base './'：所有檔案用相對路徑，放在 kevin-yeh-egroup.github.io 或任何預覽網址都能正常顯示。
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: [fileURLToPath(new URL('./index.html', import.meta.url)), fileURLToPath(new URL('./workbench/index.html', import.meta.url))],
    },
  },
})
