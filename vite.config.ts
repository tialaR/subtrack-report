import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks':      resolve(__dirname, 'src/hooks'),
      '@contexts':   resolve(__dirname, 'src/contexts'),
      '@pages':      resolve(__dirname, 'src/pages'),
      '@layouts':      resolve(__dirname, 'src/layouts'),
      '@routes':      resolve(__dirname, 'src/routes'),
      '@providers':  resolve(__dirname, 'src/providers'),
      '@services':   resolve(__dirname, 'src/services'),
      '@styles':     resolve(__dirname, 'src/styles'),
      '@utils':      resolve(__dirname, 'src/utils'),
      '@assets':     resolve(__dirname, 'src/assets'),
      '@types':      resolve(__dirname, 'src/@types'),
    },
  },
})
