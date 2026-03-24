import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use relative asset URLs so the same build works on GitHub Pages and a custom domain.
  base: command === 'build' ? './' : '/',
}))
