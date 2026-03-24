import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Keep local dev at "/" while deploying production assets under the repo path.
  base: command === 'build' ? '/Portfolio/' : '/',
}))
