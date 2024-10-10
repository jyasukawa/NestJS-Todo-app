import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // または host: '0.0.0.0'　これにより外部アクセスを許可
    port: 8080, // コンテナ内でのポート番号
    },
})
