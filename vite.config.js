import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: "Thumbtacked",
      short_name: "Thumbtacked",
      icons: [
        {
          src: "/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      display: "standalone",
      theme_color: "#ddd3ea",
      background_color: "#ffffff"
    }
    
  })]
})
