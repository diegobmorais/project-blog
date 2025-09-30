import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {   
      '/api': {
        target: 'http://project-blog-nginx',
        changeOrigin: true,
        secure: false,       
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})