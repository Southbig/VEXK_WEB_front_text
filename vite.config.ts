import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
function tsconfigPaths(): import("vite").PluginOption {
  throw new Error('Function not implemented.')
}

