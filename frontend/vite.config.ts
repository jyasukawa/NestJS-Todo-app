import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // または host: '0.0.0.0'　これにより外部アクセスを許可
    port: 8080, // コンテナ内でのポート番号
    proxy: {
      '/task': {
        target: 'http://server:3000', // NestJSバックエンドのURL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/task/, '/task'), // 必要に応じてパスを変更
      },
    },
    },
  optimizeDeps: {
    include: ['axios'],
  }
})
