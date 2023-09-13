// vite.config.ts
import { defineConfig } from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/vite@4.4.9_@types+node@20.5.7_sass@1.66.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/@vitejs+plugin-vue@4.3.4_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath } from "url";
import { basename, resolve } from "node:path";
import Unocss from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/unocss@0.55.4_postcss@8.4.29_vite@4.4.9/node_modules/unocss/dist/vite.mjs";
import Pages from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/vite-plugin-pages@0.31.0_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs";
import fs from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/index.js";
import matter from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import vuetify, { transformAssetUrls } from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/vite-plugin-vuetify@1.0.2_vite@4.4.9_vue@3.3.4_vuetify@3.3.15/node_modules/vite-plugin-vuetify/dist/index.js";
import AutoImport from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import Markdown from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/unplugin-vue-markdown@0.24.3_vite@4.4.9/node_modules/unplugin-vue-markdown/dist/vite.js";
import MarkdownItAnchor from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/markdown-it-anchor@8.6.7_@types+markdown-it@13.0.1_markdown-it@13.0.1/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";
import MarkdownItPrism from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/markdown-it-prism@2.3.0/node_modules/markdown-it-prism/build/index.js";
import MackdownItLinkAttributes from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import MarkdownItEmoji from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/index.js";
import { bundledLanguages, getHighlighter } from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/shikiji@0.6.6/node_modules/shikiji/dist/index.mjs";
import MarkdownItToc from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";

// scripts/slugify.ts
import { remove } from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/diacritics@1.3.0/node_modules/diacritics/index.js";
var rControl = /[\u0000-\u001F]/g;
var rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
function slugify(str) {
  return remove(str).replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
}

// vite.config.ts
var __vite_injected_original_dirname = "D:\\Project\\Code\\Git\\senong";
var __vite_injected_original_import_meta_url = "file:///D:/Project/Code/Git/senong/vite.config.ts";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? `./` : "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
      script: {
        defineModel: true
      }
    }),
    vuetify({
      autoImport: true
    }),
    Unocss(),
    AutoImport({
      imports: ["vue", "@vueuse/core", "vue-router", "pinia", "@vueuse/head"],
      exclude: [
        "**/dist/**"
      ],
      dts: true,
      vueTemplate: true
    }),
    Components({
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ["./src/components", "./src/layout"]
    }),
    Pages({
      extensions: ["vue", "md"],
      dirs: [
        "src/views",
        { dir: "src/views/home/", baseRoute: "" },
        { dir: "src/views/blog/**/", baseRoute: "/blog" },
        { dir: "src/views/blog/secret/", baseRoute: "/blog/secret" },
        { dir: "src/views/blog/secret/porn/**/", baseRoute: "/blog/secret/porn" },
        { dir: "src/views/error/", baseRoute: "" }
      ],
      extendRoute(route) {
        const path = resolve(__vite_injected_original_dirname, route.component.slice(1));
        if (!path.includes("projects.md") && path.endsWith(".md")) {
          const md = fs.readFileSync(path, "utf-8");
          const { data } = matter(md);
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        } else {
          route.meta = Object.assign(route.meta || {}, { frontmatter: {} });
        }
        if (route.path === "/404") {
          return {
            ...route,
            name: "404",
            component: "/src/views/error/404.vue"
          };
        }
        return {
          ...route,
          path: `${route.path}`
        };
      }
    }),
    Markdown({
      // Class names for the wrapper div
      wrapperClasses: (id, code) => code.includes("@layout-full-width") ? "" : "prose slide-enter-content",
      wrapperComponent: "WrapperMarkdown",
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
        quotes: `""''`
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      async markdownItSetup(md) {
        const shiki = await getHighlighter({
          themes: ["vitesse-dark", "vitesse-light"],
          langs: Object.keys(bundledLanguages)
        });
        md.use((markdown) => {
          markdown.options.highlight = (code, lang) => {
            return shiki.codeToHtml(code, {
              lang,
              themes: {
                light: "vitesse-light",
                dark: "vitesse-dark"
              },
              cssVariablePrefix: "--s-"
            });
          };
        });
        md.use(MarkdownItAnchor, {
          slugify,
          permalink: MarkdownItAnchor.permalink.linkInsideHeader({
            symbol: "#",
            renderAttrs: () => ({ "aria-hidden": "true" })
          })
        });
        md.use(MarkdownItPrism);
        md.use(MarkdownItToc, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><i class="fas fa-bars-staggered v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></div>'
        });
        md.use(MarkdownItEmoji);
        md.use(MackdownItLinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        (() => {
          if (!id.endsWith(".md"))
            return;
          const route = basename(id, ".md");
          if (route === "index" || frontmatter.image || !frontmatter.title)
            return;
          const path = `og/${route}.png`;
        })();
        const head = defaults(frontmatter, options);
        return { head, frontmatter };
      }
    })
  ],
  define: { "process.env": {} },
  resolve: {
    //设置别名
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [
      ".js",
      ".json",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".vue"
    ]
  },
  server: {
    port: 8080,
    //启动端口
    hmr: {
      host: "127.0.0.1",
      port: 8080
    },
    // 设置 https 代理
    proxy: {
      "/api": {
        target: "your https address",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: [
      "./src/**/*.vue"
    ]
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      treeshake: true,
      output: {
        // 缩小打包体积
        minifyInternalExports: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (/.*\.css$/.test(id)) {
              console.log("css", id);
            }
            return "vendor";
          }
        }
      }
    }
    // lib: {
    //   entry: 'src/main.ts', // 入口文件
    //   name: 'website', // 库的名称
    //   fileName: 'senong', // 输出的文件名
    //   formats: ['umd'], // 打包的格式
    // },
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9zbHVnaWZ5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdFxcXFxDb2RlXFxcXEdpdFxcXFxzZW5vbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RcXFxcQ29kZVxcXFxHaXRcXFxcc2Vub25nXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0L0NvZGUvR2l0L3Nlbm9uZy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcblxyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuaW1wb3J0IHsgYmFzZW5hbWUsIGRpcm5hbWUsIHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXHJcbi8vIFx1NUYxNVx1NTE2NVVub2Nzc1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJztcclxuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tICd1bm9jc3MnXHJcblxyXG4vLyBwYWdlXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcyc7XHJcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcclxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcclxuXHJcbi8vIFx1NUYxNVx1NTE2NXZ1ZXRpZnlcclxuaW1wb3J0IHZ1ZXRpZnksIHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0gZnJvbSAndml0ZS1wbHVnaW4tdnVldGlmeSc7XHJcblxyXG4vLyBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuXHJcbi8vIG1hcmtkb3duIFxyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndW5wbHVnaW4tdnVlLW1hcmtkb3duL3ZpdGUnXHJcbmltcG9ydCBNYXJrZG93bkl0QW5jaG9yIGZyb20gJ21hcmtkb3duLWl0LWFuY2hvcidcclxuaW1wb3J0IE1hcmtkb3duSXRQcmlzbSBmcm9tICdtYXJrZG93bi1pdC1wcmlzbSdcclxuaW1wb3J0IE1hY2tkb3duSXRMaW5rQXR0cmlidXRlcyBmcm9tICdtYXJrZG93bi1pdC1saW5rLWF0dHJpYnV0ZXMnXHJcbmltcG9ydCBNYXJrZG93bkl0RW1vamkgZnJvbSAnbWFya2Rvd24taXQtZW1vamknO1xyXG5cclxuaW1wb3J0IHsgYnVuZGxlZExhbmd1YWdlcywgZ2V0SGlnaGxpZ2h0ZXIgfSBmcm9tICdzaGlraWppJ1xyXG5cclxuLy8gdHMtZXhwZWN0LWVycm9yIG1pc3NpbmcgdHlwZXNcclxuaW1wb3J0IE1hcmtkb3duSXRUb2MgZnJvbSAnbWFya2Rvd24taXQtdGFibGUtb2YtY29udGVudHMnO1xyXG5pbXBvcnQgeyBzbHVnaWZ5IH0gZnJvbSAnLi9zY3JpcHRzL3NsdWdpZnknXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBgLi9gIDogJy4vJyxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCI7JyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0sXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcclxuICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcclxuICAgICAgc2NyaXB0OiB7XHJcbiAgICAgICAgZGVmaW5lTW9kZWw6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIHZ1ZXRpZnkoe1xyXG4gICAgICBhdXRvSW1wb3J0OiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICBVbm9jc3MoKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICdAdnVldXNlL2NvcmUnLCAndnVlLXJvdXRlcicsICdwaW5pYScsICdAdnVldXNlL2hlYWQnXSxcclxuICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICcqKi9kaXN0LyoqJyxcclxuICAgICAgXSxcclxuICAgICAgZHRzOiB0cnVlLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgZGlyczogWycuL3NyYy9jb21wb25lbnRzJywgJy4vc3JjL2xheW91dCddLFxyXG5cclxuICAgIH0pLFxyXG4gICAgUGFnZXMoe1xyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxyXG4gICAgICBkaXJzOiBbXHJcbiAgICAgICAgJ3NyYy92aWV3cycsXHJcbiAgICAgICAgeyBkaXI6ICdzcmMvdmlld3MvaG9tZS8nLCBiYXNlUm91dGU6ICcnIH0sXHJcbiAgICAgICAgeyBkaXI6ICdzcmMvdmlld3MvYmxvZy8qKi8nLCBiYXNlUm91dGU6ICcvYmxvZycgfSxcclxuICAgICAgICB7IGRpcjogJ3NyYy92aWV3cy9ibG9nL3NlY3JldC8nLCBiYXNlUm91dGU6ICcvYmxvZy9zZWNyZXQnIH0sXHJcbiAgICAgICAgeyBkaXI6ICdzcmMvdmlld3MvYmxvZy9zZWNyZXQvcG9ybi8qKi8nLCBiYXNlUm91dGU6ICcvYmxvZy9zZWNyZXQvcG9ybicgfSxcclxuICAgICAgICB7IGRpcjogJ3NyYy92aWV3cy9lcnJvci8nLCBiYXNlUm91dGU6ICcnIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGV4dGVuZFJvdXRlKHJvdXRlKSB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCByb3V0ZS5jb21wb25lbnQuc2xpY2UoMSkpXHJcblxyXG4gICAgICAgIC8vIFx1NTkwNFx1NzQwNm1hcmtkb3duXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgaWYgKCFwYXRoLmluY2x1ZGVzKCdwcm9qZWN0cy5tZCcpICYmIHBhdGguZW5kc1dpdGgoJy5tZCcpKSB7XHJcbiAgICAgICAgICBjb25zdCBtZCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKVxyXG4gICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIobWQpXHJcbiAgICAgICAgICByb3V0ZS5tZXRhID0gT2JqZWN0LmFzc2lnbihyb3V0ZS5tZXRhIHx8IHt9LCB7IGZyb250bWF0dGVyOiBkYXRhIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFx1NTkwNFx1NzQwNlx1NTE3Nlx1NEVENlx1NjU4N1x1NEVGNlxyXG4gICAgICAgICAgcm91dGUubWV0YSA9IE9iamVjdC5hc3NpZ24ocm91dGUubWV0YSB8fCB7fSwgeyBmcm9udG1hdHRlcjoge30gfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb3V0ZS5wYXRoID09PSAnLzQwNCcpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnJvdXRlLFxyXG4gICAgICAgICAgICBuYW1lOiAnNDA0JyxcclxuICAgICAgICAgICAgY29tcG9uZW50OiAnL3NyYy92aWV3cy9lcnJvci80MDQudnVlJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLnJvdXRlLFxyXG4gICAgICAgICAgcGF0aDogYCR7cm91dGUucGF0aH1gXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBNYXJrZG93bih7XHJcbiAgICAgIC8vIENsYXNzIG5hbWVzIGZvciB0aGUgd3JhcHBlciBkaXZcclxuICAgICAgd3JhcHBlckNsYXNzZXM6IChpZCwgY29kZSkgPT4gY29kZS5pbmNsdWRlcygnQGxheW91dC1mdWxsLXdpZHRoJylcclxuICAgICAgICA/ICcnXHJcbiAgICAgICAgOiAncHJvc2Ugc2xpZGUtZW50ZXItY29udGVudCcsXHJcbiAgICAgIHdyYXBwZXJDb21wb25lbnQ6ICdXcmFwcGVyTWFya2Rvd24nLFxyXG4gICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgZXhwb3J0RnJvbnRtYXR0ZXI6IGZhbHNlLFxyXG4gICAgICBleHBvc2VGcm9udG1hdHRlcjogZmFsc2UsXHJcbiAgICAgIGV4cG9zZUV4Y2VycHQ6IGZhbHNlLFxyXG4gICAgICAvLyBkZWZhdWx0IG9wdGlvbnMgcGFzc2VkIHRvIG1hcmtkb3duLWl0XHJcbiAgICAgIC8vIHNlZTogaHR0cHM6Ly9tYXJrZG93bi1pdC5naXRodWIuaW8vbWFya2Rvd24taXQvXHJcbiAgICAgIG1hcmtkb3duSXRPcHRpb25zOiB7XHJcbiAgICAgICAgaHRtbDogdHJ1ZSxcclxuICAgICAgICBsaW5raWZ5OiB0cnVlLFxyXG4gICAgICAgIHR5cG9ncmFwaGVyOiB0cnVlLFxyXG4gICAgICAgIHF1b3RlczogJ1wiXCJcXCdcXCcnLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBBIGZ1bmN0aW9uIHByb3ZpZGluZyB0aGUgTWFya2Rvd24gSXQgaW5zdGFuY2UgZ2V0cyB0aGUgYWJpbGl0eSB0byBhcHBseSBjdXN0b20gc2V0dGluZ3MvcGx1Z2luc1xyXG4gICAgICBhc3luYyBtYXJrZG93bkl0U2V0dXAobWQpIHtcclxuICAgICAgICBjb25zdCBzaGlraSA9IGF3YWl0IGdldEhpZ2hsaWdodGVyKHtcclxuICAgICAgICAgIHRoZW1lczogWyd2aXRlc3NlLWRhcmsnLCAndml0ZXNzZS1saWdodCddLFxyXG4gICAgICAgICAgbGFuZ3M6IE9iamVjdC5rZXlzKGJ1bmRsZWRMYW5ndWFnZXMpIGFzIGFueSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBmb3IgZXhhbXBsZVxyXG4gICAgICAgIG1kLnVzZSgobWFya2Rvd24pID0+IHtcclxuICAgICAgICAgIG1hcmtkb3duLm9wdGlvbnMuaGlnaGxpZ2h0ID0gKGNvZGUsIGxhbmcpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNoaWtpLmNvZGVUb0h0bWwoY29kZSwge1xyXG4gICAgICAgICAgICAgIGxhbmcsXHJcbiAgICAgICAgICAgICAgdGhlbWVzOiB7XHJcbiAgICAgICAgICAgICAgICBsaWdodDogJ3ZpdGVzc2UtbGlnaHQnLFxyXG4gICAgICAgICAgICAgICAgZGFyazogJ3ZpdGVzc2UtZGFyaycsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjc3NWYXJpYWJsZVByZWZpeDogJy0tcy0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWQudXNlKE1hcmtkb3duSXRBbmNob3IsIHtcclxuICAgICAgICAgIHNsdWdpZnksXHJcbiAgICAgICAgICBwZXJtYWxpbms6IE1hcmtkb3duSXRBbmNob3IucGVybWFsaW5rLmxpbmtJbnNpZGVIZWFkZXIoe1xyXG4gICAgICAgICAgICBzeW1ib2w6ICcjJyxcclxuICAgICAgICAgICAgcmVuZGVyQXR0cnM6ICgpID0+ICh7ICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9KSxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWQudXNlKE1hcmtkb3duSXRQcmlzbSlcclxuICAgICAgICBtZC51c2UoTWFya2Rvd25JdFRvYywge1xyXG4gICAgICAgICAgaW5jbHVkZUxldmVsOiBbMSwgMiwgMywgNF0sXHJcbiAgICAgICAgICBzbHVnaWZ5LFxyXG4gICAgICAgICAgY29udGFpbmVySGVhZGVySHRtbDogJzxkaXYgY2xhc3M9XCJ0YWJsZS1vZi1jb250ZW50cy1hbmNob3JcIj48aSBjbGFzcz1cImZhcyBmYS1iYXJzLXN0YWdnZXJlZCB2LWljb24gbm90cmFuc2xhdGUgdi10aGVtZS0tbGlnaHQgdi1pY29uLS1zaXplLWRlZmF1bHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9kaXY+JyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1kLnVzZShNYXJrZG93bkl0RW1vamkpXHJcbiAgICAgICAgbWQudXNlKE1hY2tkb3duSXRMaW5rQXR0cmlidXRlcywge1xyXG4gICAgICAgICAgbWF0Y2hlcjogKGxpbms6IHN0cmluZykgPT4gL15odHRwcz86XFwvXFwvLy50ZXN0KGxpbmspLFxyXG4gICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcclxuICAgICAgICAgICAgcmVsOiAnbm9vcGVuZXInLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBmcm9udG1hdHRlclByZXByb2Nlc3MoZnJvbnRtYXR0ZXIsIG9wdGlvbnMsIGlkLCBkZWZhdWx0cykge1xyXG5cclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFpZC5lbmRzV2l0aCgnLm1kJykpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgY29uc3Qgcm91dGUgPSBiYXNlbmFtZShpZCwgJy5tZCcpXHJcbiAgICAgICAgICBpZiAocm91dGUgPT09ICdpbmRleCcgfHwgZnJvbnRtYXR0ZXIuaW1hZ2UgfHwgIWZyb250bWF0dGVyLnRpdGxlKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIGNvbnN0IHBhdGggPSBgb2cvJHtyb3V0ZX0ucG5nYFxyXG5cclxuICAgICAgICAgIC8vIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAvLyAgIGZzLmV4aXN0c1N5bmMoYCR7aWQuc2xpY2UoMCwgLTMpfS5wbmdgKVxyXG4gICAgICAgICAgLy8gICAgID8gZnMuY29weShgJHtpZC5zbGljZSgwLCAtMyl9LnBuZ2AsIGBwdWJsaWMvJHtwYXRofWApXHJcbiAgICAgICAgICAvLyAgICAgOiBnZW5lcmF0ZU9nKGZyb250bWF0dGVyLnRpdGxlIS5yZXBsYWNlKC9cXHMtXFxzLiokLywgJycpLnRyaW0oKSwgYHB1YmxpYy8ke3BhdGh9YCksXHJcbiAgICAgICAgICAvLyApXHJcbiAgICAgICAgICAvLyBmcm9udG1hdHRlci5pbWFnZSA9IGBodHRwczovL2FudGZ1Lm1lLyR7cGF0aH1gXHJcbiAgICAgICAgfSkoKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZyb250bWF0dGVyKVxyXG4gICAgICAgIGNvbnN0IGhlYWQgPSBkZWZhdWx0cyhmcm9udG1hdHRlciwgb3B0aW9ucylcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVhZCwgZnJvbnRtYXR0ZXIgfVxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICBdLFxyXG5cclxuXHJcbiAgZGVmaW5lOiB7ICdwcm9jZXNzLmVudic6IHt9IH0sXHJcblxyXG4gIHJlc29sdmU6IHtcclxuICAgIC8vXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEXHJcbiAgICBhbGlhczoge1xyXG4gICAgICAvLyAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgfSxcclxuICAgIGV4dGVuc2lvbnM6IFtcclxuICAgICAgJy5qcycsXHJcbiAgICAgICcuanNvbicsXHJcbiAgICAgICcuanN4JyxcclxuICAgICAgJy5tanMnLFxyXG4gICAgICAnLnRzJyxcclxuICAgICAgJy50c3gnLFxyXG4gICAgICAnLnZ1ZScsXHJcbiAgICBdLFxyXG4gIH0sXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogODA4MCwgLy9cdTU0MkZcdTUyQThcdTdBRUZcdTUzRTNcclxuICAgIGhtcjoge1xyXG4gICAgICBob3N0OiAnMTI3LjAuMC4xJyxcclxuICAgICAgcG9ydDogODA4MFxyXG4gICAgfSxcclxuICAgIC8vIFx1OEJCRVx1N0Y2RSBodHRwcyBcdTRFRTNcdTc0MDZcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ3lvdXIgaHR0cHMgYWRkcmVzcycsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXhjbHVkZTogWyd2dWV0aWZ5J10sXHJcbiAgICBlbnRyaWVzOiBbXHJcbiAgICAgICcuL3NyYy8qKi8qLnZ1ZScsXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTUwMCxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgdHJlZXNoYWtlOiB0cnVlLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAvLyBcdTdGMjlcdTVDMEZcdTYyNTNcdTUzMDVcdTRGNTNcdTc5RUZcclxuICAgICAgICBtaW5pZnlJbnRlcm5hbEV4cG9ydHM6IHRydWUsXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIC8vIFx1NUMwNiBub2RlX21vZHVsZXMgXHU0RTJEXHU3Njg0XHU0RUUzXHU3ODAxXHU1MzU1XHU3MkVDXHU2MjUzXHU1MzA1XHU2MjEwXHU0RTAwXHU0RTJBIEpTIFx1NjU4N1x1NEVGNlxyXG4gICAgICAgICAgLy8gaGFzaCBjb2RlIFx1NEUwRFx1NTNEOFx1RkYwQ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NUMwNlx1N0YxM1x1NUI1OCBub2RlX21vZHVsZXMgXHU3Njg0XHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgIGlmICgvLipcXC5jc3MkLy50ZXN0KGlkKSkge1xyXG4gICAgICAgICAgICAgIC8vIFx1NTMzOVx1OTE0RFx1NjYyRlx1NTQyNlx1NUMwNm5vZGVfbW9kdWxlcyBcdTRFMkRjc3NcdTYyNTNcdTUzMDVcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3NzJywgaWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBsaWI6IHtcclxuICAgIC8vICAgZW50cnk6ICdzcmMvbWFpbi50cycsIC8vIFx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlxyXG4gICAgLy8gICBuYW1lOiAnd2Vic2l0ZScsIC8vIFx1NUU5M1x1NzY4NFx1NTQwRFx1NzlGMFxyXG4gICAgLy8gICBmaWxlTmFtZTogJ3Nlbm9uZycsIC8vIFx1OEY5M1x1NTFGQVx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgLy8gICBmb3JtYXRzOiBbJ3VtZCddLCAvLyBcdTYyNTNcdTUzMDVcdTc2ODRcdTY4M0NcdTVGMEZcclxuICAgIC8vIH0sXHJcblxyXG4gIH0sXHJcbn0pOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdFxcXFxDb2RlXFxcXEdpdFxcXFxzZW5vbmdcXFxcc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdFxcXFxDb2RlXFxcXEdpdFxcXFxzZW5vbmdcXFxcc2NyaXB0c1xcXFxzbHVnaWZ5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0L0NvZGUvR2l0L3Nlbm9uZy9zY3JpcHRzL3NsdWdpZnkudHNcIjsvLyBzdHJpbmcuanMgc2x1Z2lmeSBkcm9wcyBub24gYXNjaWkgY2hhcnMgc28gd2UgaGF2ZSB0b1xyXG4vLyB1c2UgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gaGVyZVxyXG5pbXBvcnQgeyByZW1vdmUgfSBmcm9tICdkaWFjcml0aWNzJ1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcclxuY29uc3QgckNvbnRyb2wgPSAvW1xcdTAwMDAtXFx1MDAxRl0vZ1xyXG5jb25zdCByU3BlY2lhbCA9IC9bXFxzfmAhQCMkJV4mKigpXFwtXys9W1xcXXt9fFxcXFw7OlwiJzw+LC4/L10rL2dcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzbHVnaWZ5KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgcmVtb3ZlKHN0cilcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGNvbnRyb2wgY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAucmVwbGFjZShyQ29udHJvbCwgJycpXHJcbiAgICAgICAgICAgIC8vIFJlcGxhY2Ugc3BlY2lhbCBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKHJTcGVjaWFsLCAnLScpXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjb250aW51b3Mgc2VwYXJhdG9yc1xyXG4gICAgICAgICAgICAucmVwbGFjZSgvLXsyLH0vZywgJy0nKVxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgcHJlZml4aW5nIGFuZCB0cmFpbGluZyBzZXBhcnRvcnNcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14tK3wtKyQvZywgJycpXHJcbiAgICAgICAgICAgIC8vIGVuc3VyZSBpdCBkb2Vzbid0IHN0YXJ0IHdpdGggYSBudW1iZXIgKCMxMjEpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eKFxcZCkvLCAnXyQxJylcclxuICAgICAgICAgICAgLy8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICApXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBRLFNBQVMsb0JBQW9CO0FBQ3ZTLE9BQU8sU0FBUztBQUVoQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLFVBQW1CLGVBQWU7QUFFM0MsT0FBTyxZQUFZO0FBSW5CLE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVE7QUFDZixPQUFPLFlBQVk7QUFHbkIsT0FBTyxXQUFXLDBCQUEwQjtBQUc1QyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUd2QixPQUFPLGNBQWM7QUFDckIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyw4QkFBOEI7QUFDckMsT0FBTyxxQkFBcUI7QUFFNUIsU0FBUyxrQkFBa0Isc0JBQXNCO0FBR2pELE9BQU8sbUJBQW1COzs7QUM3QjFCLFNBQVMsY0FBYztBQUd2QixJQUFNLFdBQVc7QUFDakIsSUFBTSxXQUFXO0FBRVYsU0FBUyxRQUFRLEtBQXFCO0FBQ3pDLFNBQ0ksT0FBTyxHQUFHLEVBRUwsUUFBUSxVQUFVLEVBQUUsRUFFcEIsUUFBUSxVQUFVLEdBQUcs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
