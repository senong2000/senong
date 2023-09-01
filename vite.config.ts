import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { fileURLToPath } from 'url';
import { basename, dirname, resolve } from 'node:path'
// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// page
import Pages from 'vite-plugin-pages';
import fs from 'fs-extra'
import matter from 'gray-matter'

// 引入vuetify
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// markdown 
import Markdown from 'unplugin-vue-markdown/vite'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItPrism from 'markdown-it-prism'
import MackdownItLinkAttributes from 'markdown-it-link-attributes'
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItToc from 'markdown-it-table-of-contents';
import { slugify } from './src/utils/slugify'

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
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        'src/views',
        { dir: 'src/views/home', baseRoute: '' },
        { dir: 'src/views/blog/docs', baseRoute: 'docs' }
      ],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      },
    }),
    Markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      async markdownItSetup(md) {
        // for example
        md.use(MarkdownItAnchor, {
          slugify,
          permalink: MarkdownItAnchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        md.use(MarkdownItPrism)
        md.use(MarkdownItPrism)
        md.use(MarkdownItToc)
        md.use(MarkdownItEmoji)


        md.use(MackdownItLinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body',
      wrapperComponent: id => id.includes('/blog/')
        ? 'WrapperDemo'
        : 'WrapperPost',

    })
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