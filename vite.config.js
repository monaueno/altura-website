import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-video-response',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.mp4')) {
            res.setHeader('Content-Type', 'video/mp4')
            res.setHeader('Accept-Ranges', 'bytes')
          }
          next()
        })
      }
    }
  ],
  assetsInclude: ['**/*.mp4']
})
