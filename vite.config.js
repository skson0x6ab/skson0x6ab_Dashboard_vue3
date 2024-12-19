import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    vue(),
VitePWA({
      registerType: 'autoUpdate', // 자동으로 PWA 업데이트
      manifest: {
        name: 'SKSON', // 앱 이름
        short_name: 'SKSON', // 홈 화면에 표시될 앱 이름
        description: 'skson0x6ab_dashboard_vue3', // 앱 설명
        theme_color: '#ffffff', // 브라우저 테마 색상
        background_color: '#ffffff', // 초기 로딩 화면 배경색
        display: 'standalone', // 독립 실행형
        icons: [
          {
            src: '/icon59.png', // 192x192 아이콘 경로
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon59.png', // 512x512 아이콘 경로
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon59.png', // 마스킹 지원 아이콘
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api\.domain\.com\/.*$/, // 캐싱할 API 경로
            handler: 'NetworkFirst', // 네트워크 우선 전략
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7일
              },
            },
          },
          {
            urlPattern: /^https:\/\/your-cdn\.domain\.com\/.*$/, // 정적 파일 캐싱
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30일
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: [
      '@tailwindConfig',
    ]
  },  
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
