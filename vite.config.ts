import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// 引入vuetify
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },

  plugins: [
    vue({
      template: { transformAssetUrls },
      reactivityTransform: true,
    }),
    vuetify({
      autoImport: true,
    }),
    Unocss({ // 使用Unocss
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ],
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

  base: "./",

  define: { 'process.env': {} },

  resolve: {
    //设置别名
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
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
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      treeshake: true,
      output: {
        // 缩小打包体积
        minifyInternalExports: true,
        manualChunks: (id) => {
          // 将 node_modules 中的代码单独打包成一个 JS 文件
          // hash code 不变，浏览器将缓存 node_modules 的文件
          if (id.includes('node_modules')) {
            if (/.*\.css$/.test(id)) {
              // 匹配是否将node_modules 中css打包
              console.log('css', id)
            }
            return 'vendor'
          }
        }
      }
    }
  },
});