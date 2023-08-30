import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// 引入vuetify
import vuetify from 'vite-plugin-vuetify';

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    Unocss({ // 使用Unocss
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()],
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
      exclude: [
        '**/dist/**',
      ],
      dts: true,
      vueTemplate: true,
    }),
    Components({
      dirs: ['./src/components'],
      dts: true,
    }),
  ],
  resolve: {
    //设置别名
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },

  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'your https address',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },

  optimizeDeps: {
    exclude: ['vuetify'],
    entries: [
      './src/**/*.vue',
    ],
  },
});