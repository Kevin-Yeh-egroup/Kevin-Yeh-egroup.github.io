import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './'：所有檔案用相對路徑，放在 kevin-yeh-egroup.github.io 或任何預覽網址都能正常顯示。
export default defineConfig({
  base: './',
  plugins: [react()],
})
