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

import { bundledLanguages, getHighlighter } from 'shikiji'

// ts-expect-error missing types
import MarkdownItToc from 'markdown-it-table-of-contents';
import { slugify } from './scripts/slugify'

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
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
      script: {
        defineModel: true,
      },
    }),
    vuetify({
      autoImport: true,
    }),
    Unocss(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue-router', 'pinia', '@vueuse/head'],
      exclude: [
        '**/dist/**',
      ],
      dts: true,
      vueTemplate: true,
    }),
    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['./src/components'],

    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        'src/views',
        { dir: 'src/views/home', baseRoute: '' },
        { dir: 'src/views/blog/**', baseRoute: 'blog' }
      ],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        // 处理markdown文件
        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        } else {
          // 处理其他文件
          route.meta = Object.assign(route.meta || {}, { frontmatter: {} })
        }
        return route
      },
    }),
    Markdown({
      // Class names for the wrapper div
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      wrapperComponent: 'WrapperMarkdown',
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        quotes: '""\'\'',
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      async markdownItSetup(md) {
        const shiki = await getHighlighter({
          themes: ['vitesse-dark', 'vitesse-light'],
          langs: Object.keys(bundledLanguages) as any,
        })

        // for example
        md.use((markdown) => {
          markdown.options.highlight = (code, lang) => {
            return shiki.codeToHtml(code, {
              lang,
              themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
              },
              cssVariablePrefix: '--s-',
            })
          }
        })
        md.use(MarkdownItAnchor, {
          slugify,
          permalink: MarkdownItAnchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        md.use(MarkdownItPrism)
        md.use(MarkdownItToc, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })
        md.use(MarkdownItEmoji)
        md.use(MackdownItLinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {

        (() => {
          if (!id.endsWith('.md'))
            return
          const route = basename(id, '.md')
          if (route === 'index' || frontmatter.image || !frontmatter.title)
            return
          const path = `og/${route}.png`

          // promises.push(
          //   fs.existsSync(`${id.slice(0, -3)}.png`)
          //     ? fs.copy(`${id.slice(0, -3)}.png`, `public/${path}`)
          //     : generateOg(frontmatter.title!.replace(/\s-\s.*$/, '').trim(), `public/${path}`),
          // )
          // frontmatter.image = `https://antfu.me/${path}`
        })()

        // console.log(id)

        const head = defaults(frontmatter, options)

        return { head, frontmatter }
      },
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
    },
    // lib: {
    //   entry: 'src/main.ts', // 入口文件
    //   name: 'website', // 库的名称
    //   fileName: 'senong', // 输出的文件名
    //   formats: ['umd'], // 打包的格式
    // },
  },
});