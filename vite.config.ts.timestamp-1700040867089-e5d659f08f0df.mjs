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
import glsl from "file:///D:/Project/Code/Git/senong/node_modules/.pnpm/vite-plugin-glsl@1.1.2_vite@4.4.9/node_modules/vite-plugin-glsl/src/index.js";
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
    Unocss(),
    vuetify({
      autoImport: true
    }),
    glsl({
      include: [
        // Glob pattern, or array of glob patterns to import
        "**/*.glsl",
        "**/*.wgsl",
        "**/*.vert",
        "**/*.frag",
        "**/*.vs",
        "**/*.fs"
      ],
      exclude: void 0,
      // Glob pattern, or array of glob patterns to ignore
      warnDuplicatedImports: true,
      // Warn if the same chunk was imported multiple times
      defaultExtension: "glsl",
      // Shader suffix when no extension is specified
      compress: false,
      // Compress output shader code
      watch: true
      // Recompile shader on change
    }),
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
        { dir: "src/views/projects/webgl/shader", baseRoute: "/projects/webgl/shader" },
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
        const webglRegExp = new RegExp("/projects/webgl");
        const resumeRegExp = new RegExp("/resume");
        if (route.path === "/404") {
          return {
            ...route,
            name: "404",
            component: "/src/views/error/404.vue"
          };
        } else if (webglRegExp.test(route.path)) {
          return {
            path: "/webgl",
            component: "/src/layout/webgl/index.vue",
            children: [
              {
                ...route
              }
            ]
          };
        } else if (resumeRegExp.test(route.path)) {
          return {
            path: "/resume",
            component: "/src/layout/resume/index.vue",
            children: [
              {
                ...route
              }
            ]
          };
        } else {
          return {
            path: "/website",
            component: "/src/layout/website/index.vue",
            children: [
              {
                ...route
              }
            ]
          };
        }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9zbHVnaWZ5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdFxcXFxDb2RlXFxcXEdpdFxcXFxzZW5vbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RcXFxcQ29kZVxcXFxHaXRcXFxcc2Vub25nXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0L0NvZGUvR2l0L3Nlbm9uZy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcblxyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuaW1wb3J0IHsgYmFzZW5hbWUsIGRpcm5hbWUsIHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXHJcbi8vIFx1NUYxNVx1NTE2NVVub2Nzc1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJztcclxuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tICd1bm9jc3MnXHJcblxyXG4vLyBwYWdlXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcyc7XHJcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcclxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcclxuXHJcbi8vIFx1NUYxNVx1NTE2NXZ1ZXRpZnlcclxuaW1wb3J0IHZ1ZXRpZnksIHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0gZnJvbSAndml0ZS1wbHVnaW4tdnVldGlmeSc7XHJcblxyXG4vLyBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuXHJcbi8vIG1hcmtkb3duIFxyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndW5wbHVnaW4tdnVlLW1hcmtkb3duL3ZpdGUnXHJcbmltcG9ydCBNYXJrZG93bkl0QW5jaG9yIGZyb20gJ21hcmtkb3duLWl0LWFuY2hvcidcclxuaW1wb3J0IE1hcmtkb3duSXRQcmlzbSBmcm9tICdtYXJrZG93bi1pdC1wcmlzbSdcclxuaW1wb3J0IE1hY2tkb3duSXRMaW5rQXR0cmlidXRlcyBmcm9tICdtYXJrZG93bi1pdC1saW5rLWF0dHJpYnV0ZXMnXHJcbmltcG9ydCBNYXJrZG93bkl0RW1vamkgZnJvbSAnbWFya2Rvd24taXQtZW1vamknO1xyXG5cclxuaW1wb3J0IHsgYnVuZGxlZExhbmd1YWdlcywgZ2V0SGlnaGxpZ2h0ZXIgfSBmcm9tICdzaGlraWppJ1xyXG5cclxuaW1wb3J0IGdsc2wgZnJvbSAndml0ZS1wbHVnaW4tZ2xzbCc7XHJcblxyXG4vLyB0cy1leHBlY3QtZXJyb3IgbWlzc2luZyB0eXBlc1xyXG5pbXBvcnQgTWFya2Rvd25JdFRvYyBmcm9tICdtYXJrZG93bi1pdC10YWJsZS1vZi1jb250ZW50cyc7XHJcbmltcG9ydCB7IHNsdWdpZnkgfSBmcm9tICcuL3NjcmlwdHMvc2x1Z2lmeSdcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gYC4vYCA6ICcuLycsXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiOycsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHRlbXBsYXRlOiB7IHRyYW5zZm9ybUFzc2V0VXJscyB9LFxyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXHJcbiAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXHJcbiAgICAgIHNjcmlwdDoge1xyXG4gICAgICAgIGRlZmluZU1vZGVsOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcblxyXG4gICAgVW5vY3NzKCksXHJcblxyXG4gICAgdnVldGlmeSh7XHJcbiAgICAgIGF1dG9JbXBvcnQ6IHRydWUsXHJcbiAgICB9KSxcclxuXHJcbiAgICBnbHNsKHtcclxuICAgICAgaW5jbHVkZTogWyAgICAgICAgICAgICAgICAgICAvLyBHbG9iIHBhdHRlcm4sIG9yIGFycmF5IG9mIGdsb2IgcGF0dGVybnMgdG8gaW1wb3J0XHJcbiAgICAgICAgJyoqLyouZ2xzbCcsICcqKi8qLndnc2wnLFxyXG4gICAgICAgICcqKi8qLnZlcnQnLCAnKiovKi5mcmFnJyxcclxuICAgICAgICAnKiovKi52cycsICcqKi8qLmZzJ1xyXG4gICAgICBdLFxyXG4gICAgICBleGNsdWRlOiB1bmRlZmluZWQsICAgICAgICAgIC8vIEdsb2IgcGF0dGVybiwgb3IgYXJyYXkgb2YgZ2xvYiBwYXR0ZXJucyB0byBpZ25vcmVcclxuICAgICAgd2FybkR1cGxpY2F0ZWRJbXBvcnRzOiB0cnVlLCAvLyBXYXJuIGlmIHRoZSBzYW1lIGNodW5rIHdhcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lc1xyXG4gICAgICBkZWZhdWx0RXh0ZW5zaW9uOiAnZ2xzbCcsICAgIC8vIFNoYWRlciBzdWZmaXggd2hlbiBubyBleHRlbnNpb24gaXMgc3BlY2lmaWVkXHJcbiAgICAgIGNvbXByZXNzOiBmYWxzZSwgICAgICAgICAgICAgLy8gQ29tcHJlc3Mgb3V0cHV0IHNoYWRlciBjb2RlXHJcbiAgICAgIHdhdGNoOiB0cnVlLCAgICAgICAgICAgICAgICAgLy8gUmVjb21waWxlIHNoYWRlciBvbiBjaGFuZ2VcclxuICAgIH0pLFxyXG5cclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnLCAnQHZ1ZXVzZS9oZWFkJ10sXHJcbiAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAnKiovZGlzdC8qKicsXHJcbiAgICAgIF0sXHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cycsICcuL3NyYy9sYXlvdXQnXSxcclxuXHJcbiAgICB9KSxcclxuICAgIFBhZ2VzKHtcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuICAgICAgZGlyczogW1xyXG4gICAgICAgICdzcmMvdmlld3MnLFxyXG4gICAgICAgIHsgZGlyOiAnc3JjL3ZpZXdzL2hvbWUvJywgYmFzZVJvdXRlOiAnJyB9LFxyXG4gICAgICAgIHsgZGlyOiAnc3JjL3ZpZXdzL2Jsb2cvKiovJywgYmFzZVJvdXRlOiAnL2Jsb2cnIH0sXHJcbiAgICAgICAgeyBkaXI6ICdzcmMvdmlld3MvYmxvZy9zZWNyZXQvJywgYmFzZVJvdXRlOiAnL2Jsb2cvc2VjcmV0JyB9LFxyXG4gICAgICAgIHsgZGlyOiAnc3JjL3ZpZXdzL2Jsb2cvc2VjcmV0L3Bvcm4vKiovJywgYmFzZVJvdXRlOiAnL2Jsb2cvc2VjcmV0L3Bvcm4nIH0sXHJcbiAgICAgICAgeyBkaXI6ICdzcmMvdmlld3MvcHJvamVjdHMvd2ViZ2wvc2hhZGVyJywgYmFzZVJvdXRlOiAnL3Byb2plY3RzL3dlYmdsL3NoYWRlcicgfSxcclxuICAgICAgICB7IGRpcjogJ3NyYy92aWV3cy9lcnJvci8nLCBiYXNlUm91dGU6ICcnIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGV4dGVuZFJvdXRlKHJvdXRlKSB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCByb3V0ZS5jb21wb25lbnQuc2xpY2UoMSkpXHJcblxyXG4gICAgICAgIC8vIFx1NTkwNFx1NzQwNm1hcmtkb3duXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgaWYgKCFwYXRoLmluY2x1ZGVzKCdwcm9qZWN0cy5tZCcpICYmIHBhdGguZW5kc1dpdGgoJy5tZCcpKSB7XHJcbiAgICAgICAgICBjb25zdCBtZCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKVxyXG4gICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIobWQpXHJcbiAgICAgICAgICByb3V0ZS5tZXRhID0gT2JqZWN0LmFzc2lnbihyb3V0ZS5tZXRhIHx8IHt9LCB7IGZyb250bWF0dGVyOiBkYXRhIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFx1NTkwNFx1NzQwNlx1NTE3Nlx1NEVENlx1NjU4N1x1NEVGNlxyXG4gICAgICAgICAgcm91dGUubWV0YSA9IE9iamVjdC5hc3NpZ24ocm91dGUubWV0YSB8fCB7fSwgeyBmcm9udG1hdHRlcjoge30gfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyb3V0ZS5wYXRoKVxyXG5cclxuICAgICAgICBjb25zdCB3ZWJnbFJlZ0V4cCA9IG5ldyBSZWdFeHAoJy9wcm9qZWN0cy93ZWJnbCcpXHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VtZVJlZ0V4cCA9IG5ldyBSZWdFeHAoJy9yZXN1bWUnKVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHJvdXRlLnBhdGggPT09ICcvNDA0Jykge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4ucm91dGUsXHJcbiAgICAgICAgICAgIG5hbWU6ICc0MDQnLFxyXG4gICAgICAgICAgICBjb21wb25lbnQ6ICcvc3JjL3ZpZXdzL2Vycm9yLzQwNC52dWUnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHdlYmdsUmVnRXhwLnRlc3Qocm91dGUucGF0aCkpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhdGg6ICcvd2ViZ2wnLFxyXG4gICAgICAgICAgICBjb21wb25lbnQ6ICcvc3JjL2xheW91dC93ZWJnbC9pbmRleC52dWUnLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC4uLnJvdXRlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlc3VtZVJlZ0V4cC50ZXN0KHJvdXRlLnBhdGgpKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwYXRoOiAnL3Jlc3VtZScsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogJy9zcmMvbGF5b3V0L3Jlc3VtZS9pbmRleC52dWUnLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC4uLnJvdXRlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGF0aDogJy93ZWJzaXRlJyxcclxuICAgICAgICAgICAgY29tcG9uZW50OiAnL3NyYy9sYXlvdXQvd2Vic2l0ZS9pbmRleC52dWUnLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC4uLnJvdXRlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBNYXJrZG93bih7XHJcbiAgICAgIC8vIENsYXNzIG5hbWVzIGZvciB0aGUgd3JhcHBlciBkaXZcclxuICAgICAgd3JhcHBlckNsYXNzZXM6IChpZCwgY29kZSkgPT4gY29kZS5pbmNsdWRlcygnQGxheW91dC1mdWxsLXdpZHRoJylcclxuICAgICAgICA/ICcnXHJcbiAgICAgICAgOiAncHJvc2Ugc2xpZGUtZW50ZXItY29udGVudCcsXHJcbiAgICAgIHdyYXBwZXJDb21wb25lbnQ6ICdXcmFwcGVyTWFya2Rvd24nLFxyXG4gICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgZXhwb3J0RnJvbnRtYXR0ZXI6IGZhbHNlLFxyXG4gICAgICBleHBvc2VGcm9udG1hdHRlcjogZmFsc2UsXHJcbiAgICAgIGV4cG9zZUV4Y2VycHQ6IGZhbHNlLFxyXG4gICAgICAvLyBkZWZhdWx0IG9wdGlvbnMgcGFzc2VkIHRvIG1hcmtkb3duLWl0XHJcbiAgICAgIC8vIHNlZTogaHR0cHM6Ly9tYXJrZG93bi1pdC5naXRodWIuaW8vbWFya2Rvd24taXQvXHJcbiAgICAgIG1hcmtkb3duSXRPcHRpb25zOiB7XHJcbiAgICAgICAgaHRtbDogdHJ1ZSxcclxuICAgICAgICBsaW5raWZ5OiB0cnVlLFxyXG4gICAgICAgIHR5cG9ncmFwaGVyOiB0cnVlLFxyXG4gICAgICAgIHF1b3RlczogJ1wiXCJcXCdcXCcnLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBBIGZ1bmN0aW9uIHByb3ZpZGluZyB0aGUgTWFya2Rvd24gSXQgaW5zdGFuY2UgZ2V0cyB0aGUgYWJpbGl0eSB0byBhcHBseSBjdXN0b20gc2V0dGluZ3MvcGx1Z2luc1xyXG4gICAgICBhc3luYyBtYXJrZG93bkl0U2V0dXAobWQpIHtcclxuICAgICAgICBjb25zdCBzaGlraSA9IGF3YWl0IGdldEhpZ2hsaWdodGVyKHtcclxuICAgICAgICAgIHRoZW1lczogWyd2aXRlc3NlLWRhcmsnLCAndml0ZXNzZS1saWdodCddLFxyXG4gICAgICAgICAgbGFuZ3M6IE9iamVjdC5rZXlzKGJ1bmRsZWRMYW5ndWFnZXMpIGFzIGFueSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBmb3IgZXhhbXBsZVxyXG4gICAgICAgIG1kLnVzZSgobWFya2Rvd24pID0+IHtcclxuICAgICAgICAgIG1hcmtkb3duLm9wdGlvbnMuaGlnaGxpZ2h0ID0gKGNvZGUsIGxhbmcpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNoaWtpLmNvZGVUb0h0bWwoY29kZSwge1xyXG4gICAgICAgICAgICAgIGxhbmcsXHJcbiAgICAgICAgICAgICAgdGhlbWVzOiB7XHJcbiAgICAgICAgICAgICAgICBsaWdodDogJ3ZpdGVzc2UtbGlnaHQnLFxyXG4gICAgICAgICAgICAgICAgZGFyazogJ3ZpdGVzc2UtZGFyaycsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjc3NWYXJpYWJsZVByZWZpeDogJy0tcy0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWQudXNlKE1hcmtkb3duSXRBbmNob3IsIHtcclxuICAgICAgICAgIHNsdWdpZnksXHJcbiAgICAgICAgICBwZXJtYWxpbms6IE1hcmtkb3duSXRBbmNob3IucGVybWFsaW5rLmxpbmtJbnNpZGVIZWFkZXIoe1xyXG4gICAgICAgICAgICBzeW1ib2w6ICcjJyxcclxuICAgICAgICAgICAgcmVuZGVyQXR0cnM6ICgpID0+ICh7ICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9KSxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWQudXNlKE1hcmtkb3duSXRQcmlzbSlcclxuXHJcbiAgICAgICAgbWQudXNlKE1hcmtkb3duSXRUb2MsIHtcclxuICAgICAgICAgIGluY2x1ZGVMZXZlbDogWzEsIDIsIDMsIDRdLFxyXG4gICAgICAgICAgc2x1Z2lmeSxcclxuICAgICAgICAgIGNvbnRhaW5lckhlYWRlckh0bWw6ICc8ZGl2IGNsYXNzPVwidGFibGUtb2YtY29udGVudHMtYW5jaG9yXCI+PGkgY2xhc3M9XCJmYXMgZmEtYmFycy1zdGFnZ2VyZWQgdi1pY29uIG5vdHJhbnNsYXRlIHYtdGhlbWUtLWxpZ2h0IHYtaWNvbi0tc2l6ZS1kZWZhdWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PicsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbWQudXNlKE1hcmtkb3duSXRFbW9qaSlcclxuICAgICAgICBtZC51c2UoTWFja2Rvd25JdExpbmtBdHRyaWJ1dGVzLCB7XHJcbiAgICAgICAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXHJcbiAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgICAgICAgICByZWw6ICdub29wZW5lcicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGZyb250bWF0dGVyUHJlcHJvY2Vzcyhmcm9udG1hdHRlciwgb3B0aW9ucywgaWQsIGRlZmF1bHRzKSB7XHJcblxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWlkLmVuZHNXaXRoKCcubWQnKSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICBjb25zdCByb3V0ZSA9IGJhc2VuYW1lKGlkLCAnLm1kJylcclxuICAgICAgICAgIGlmIChyb3V0ZSA9PT0gJ2luZGV4JyB8fCBmcm9udG1hdHRlci5pbWFnZSB8fCAhZnJvbnRtYXR0ZXIudGl0bGUpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgY29uc3QgcGF0aCA9IGBvZy8ke3JvdXRlfS5wbmdgXHJcblxyXG4gICAgICAgICAgLy8gcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgIC8vICAgZnMuZXhpc3RzU3luYyhgJHtpZC5zbGljZSgwLCAtMyl9LnBuZ2ApXHJcbiAgICAgICAgICAvLyAgICAgPyBmcy5jb3B5KGAke2lkLnNsaWNlKDAsIC0zKX0ucG5nYCwgYHB1YmxpYy8ke3BhdGh9YClcclxuICAgICAgICAgIC8vICAgICA6IGdlbmVyYXRlT2coZnJvbnRtYXR0ZXIudGl0bGUhLnJlcGxhY2UoL1xccy1cXHMuKiQvLCAnJykudHJpbSgpLCBgcHVibGljLyR7cGF0aH1gKSxcclxuICAgICAgICAgIC8vIClcclxuICAgICAgICAgIC8vIGZyb250bWF0dGVyLmltYWdlID0gYGh0dHBzOi8vYW50ZnUubWUvJHtwYXRofWBcclxuICAgICAgICB9KSgpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZnJvbnRtYXR0ZXIpXHJcbiAgICAgICAgY29uc3QgaGVhZCA9IGRlZmF1bHRzKGZyb250bWF0dGVyLCBvcHRpb25zKVxyXG5cclxuICAgICAgICByZXR1cm4geyBoZWFkLCBmcm9udG1hdHRlciB9XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIF0sXHJcblxyXG5cclxuICBkZWZpbmU6IHsgJ3Byb2Nlc3MuZW52Jzoge30gfSxcclxuXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgLy9cdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIC8vICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAnLmpzJyxcclxuICAgICAgJy5qc29uJyxcclxuICAgICAgJy5qc3gnLFxyXG4gICAgICAnLm1qcycsXHJcbiAgICAgICcudHMnLFxyXG4gICAgICAnLnRzeCcsXHJcbiAgICAgICcudnVlJyxcclxuICAgIF0sXHJcbiAgfSxcclxuXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA4MDgwLCAvL1x1NTQyRlx1NTJBOFx1N0FFRlx1NTNFM1xyXG4gICAgaG1yOiB7XHJcbiAgICAgIGhvc3Q6ICcxMjcuMC4wLjEnLFxyXG4gICAgICBwb3J0OiA4MDgwXHJcbiAgICB9LFxyXG4gICAgLy8gXHU4QkJFXHU3RjZFIGh0dHBzIFx1NEVFM1x1NzQwNlxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAneW91ciBodHRwcyBhZGRyZXNzJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBleGNsdWRlOiBbJ3Z1ZXRpZnknXSxcclxuICAgIGVudHJpZXM6IFtcclxuICAgICAgJy4vc3JjLyoqLyoudnVlJyxcclxuICAgIF0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICB0cmVlc2hha2U6IHRydWUsXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFx1N0YyOVx1NUMwRlx1NjI1M1x1NTMwNVx1NEY1M1x1NzlFRlxyXG4gICAgICAgIG1pbmlmeUludGVybmFsRXhwb3J0czogdHJ1ZSxcclxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgLy8gXHU1QzA2IG5vZGVfbW9kdWxlcyBcdTRFMkRcdTc2ODRcdTRFRTNcdTc4MDFcdTUzNTVcdTcyRUNcdTYyNTNcdTUzMDVcdTYyMTBcdTRFMDBcdTRFMkEgSlMgXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAvLyBoYXNoIGNvZGUgXHU0RTBEXHU1M0Q4XHVGRjBDXHU2RDRGXHU4OUM4XHU1NjY4XHU1QzA2XHU3RjEzXHU1QjU4IG5vZGVfbW9kdWxlcyBcdTc2ODRcdTY1ODdcdTRFRjZcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgaWYgKC8uKlxcLmNzcyQvLnRlc3QoaWQpKSB7XHJcbiAgICAgICAgICAgICAgLy8gXHU1MzM5XHU5MTREXHU2NjJGXHU1NDI2XHU1QzA2bm9kZV9tb2R1bGVzIFx1NEUyRGNzc1x1NjI1M1x1NTMwNVxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjc3MnLCBpZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIGxpYjoge1xyXG4gICAgLy8gICBlbnRyeTogJ3NyYy9tYWluLnRzJywgLy8gXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHJcbiAgICAvLyAgIG5hbWU6ICd3ZWJzaXRlJywgLy8gXHU1RTkzXHU3Njg0XHU1NDBEXHU3OUYwXHJcbiAgICAvLyAgIGZpbGVOYW1lOiAnc2Vub25nJywgLy8gXHU4RjkzXHU1MUZBXHU3Njg0XHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAvLyAgIGZvcm1hdHM6IFsndW1kJ10sIC8vIFx1NjI1M1x1NTMwNVx1NzY4NFx1NjgzQ1x1NUYwRlxyXG4gICAgLy8gfSxcclxuXHJcbiAgfSxcclxufSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0XFxcXENvZGVcXFxcR2l0XFxcXHNlbm9uZ1xcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0XFxcXENvZGVcXFxcR2l0XFxcXHNlbm9uZ1xcXFxzY3JpcHRzXFxcXHNsdWdpZnkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3QvQ29kZS9HaXQvc2Vub25nL3NjcmlwdHMvc2x1Z2lmeS50c1wiOy8vIHN0cmluZy5qcyBzbHVnaWZ5IGRyb3BzIG5vbiBhc2NpaSBjaGFycyBzbyB3ZSBoYXZlIHRvXHJcbi8vIHVzZSBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBoZXJlXHJcbmltcG9ydCB7IHJlbW92ZSB9IGZyb20gJ2RpYWNyaXRpY3MnXHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxyXG5jb25zdCByQ29udHJvbCA9IC9bXFx1MDAwMC1cXHUwMDFGXS9nXHJcbmNvbnN0IHJTcGVjaWFsID0gL1tcXHN+YCFAIyQlXiYqKClcXC1fKz1bXFxde318XFxcXDs6XCInPD4sLj8vXSsvZ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNsdWdpZnkoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICByZW1vdmUoc3RyKVxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgY29udHJvbCBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKHJDb250cm9sLCAnJylcclxuICAgICAgICAgICAgLy8gUmVwbGFjZSBzcGVjaWFsIGNoYXJhY3RlcnNcclxuICAgICAgICAgICAgLnJlcGxhY2UoclNwZWNpYWwsICctJylcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGNvbnRpbnVvcyBzZXBhcmF0b3JzXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tezIsfS9nLCAnLScpXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBwcmVmaXhpbmcgYW5kIHRyYWlsaW5nIHNlcGFydG9yc1xyXG4gICAgICAgICAgICAucmVwbGFjZSgvXi0rfC0rJC9nLCAnJylcclxuICAgICAgICAgICAgLy8gZW5zdXJlIGl0IGRvZXNuJ3Qgc3RhcnQgd2l0aCBhIG51bWJlciAoIzEyMSlcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14oXFxkKS8sICdfJDEnKVxyXG4gICAgICAgICAgICAvLyBsb3dlcmNhc2VcclxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgIClcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFEsU0FBUyxvQkFBb0I7QUFDdlMsT0FBTyxTQUFTO0FBRWhCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsVUFBbUIsZUFBZTtBQUUzQyxPQUFPLFlBQVk7QUFJbkIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sUUFBUTtBQUNmLE9BQU8sWUFBWTtBQUduQixPQUFPLFdBQVcsMEJBQTBCO0FBRzVDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBR3ZCLE9BQU8sY0FBYztBQUNyQixPQUFPLHNCQUFzQjtBQUM3QixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLDhCQUE4QjtBQUNyQyxPQUFPLHFCQUFxQjtBQUU1QixTQUFTLGtCQUFrQixzQkFBc0I7QUFFakQsT0FBTyxVQUFVO0FBR2pCLE9BQU8sbUJBQW1COzs7QUMvQjFCLFNBQVMsY0FBYztBQUd2QixJQUFNLFdBQVc7QUFDakIsSUFBTSxXQUFXO0FBRVYsU0FBUyxRQUFRLEtBQXFCO0FBQ3pDLFNBQ0ksT0FBTyxHQUFHLEVBRUwsUUFBUSxVQUFVLEVBQUUsRUFFcEIsUUFBUSxVQUFVLEdBQUcsRUFFckIsUUFBUSxVQUFVLEdBQUcsRUFFckIsUUFBUSxZQUFZLEVBQUUsRUFFdEIsUUFBUSxTQUFTLEtBQUssRUFFdEIsWUFBWTtBQUV6Qjs7O0FEeEJBLElBQU0sbUNBQW1DO0FBQTRILElBQU0sMkNBQTJDO0FBb0N0TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNLFFBQVEsSUFBSSxhQUFhLGVBQWUsT0FBTztBQUFBLEVBQ3JELEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVUsRUFBRSxtQkFBbUI7QUFBQSxNQUMvQixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUEsTUFDM0IscUJBQXFCO0FBQUEsTUFDckIsUUFBUTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUVELE9BQU87QUFBQSxJQUVQLFFBQVE7QUFBQSxNQUNOLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxJQUVELEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQTtBQUFBLFFBQ1A7QUFBQSxRQUFhO0FBQUEsUUFDYjtBQUFBLFFBQWE7QUFBQSxRQUNiO0FBQUEsUUFBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFNBQVM7QUFBQTtBQUFBLE1BQ1QsdUJBQXVCO0FBQUE7QUFBQSxNQUN2QixrQkFBa0I7QUFBQTtBQUFBLE1BQ2xCLFVBQVU7QUFBQTtBQUFBLE1BQ1YsT0FBTztBQUFBO0FBQUEsSUFDVCxDQUFDO0FBQUEsSUFHRCxXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsT0FBTyxnQkFBZ0IsY0FBYyxTQUFTLGNBQWM7QUFBQSxNQUN0RSxTQUFTO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQSxNQUNMLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQSxNQUN4QixLQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsVUFBVSxjQUFjLE9BQU87QUFBQSxNQUN6QyxNQUFNLENBQUMsb0JBQW9CLGNBQWM7QUFBQSxJQUUzQyxDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsTUFDSixZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsTUFDeEIsTUFBTTtBQUFBLFFBQ0o7QUFBQSxRQUNBLEVBQUUsS0FBSyxtQkFBbUIsV0FBVyxHQUFHO0FBQUEsUUFDeEMsRUFBRSxLQUFLLHNCQUFzQixXQUFXLFFBQVE7QUFBQSxRQUNoRCxFQUFFLEtBQUssMEJBQTBCLFdBQVcsZUFBZTtBQUFBLFFBQzNELEVBQUUsS0FBSyxrQ0FBa0MsV0FBVyxvQkFBb0I7QUFBQSxRQUN4RSxFQUFFLEtBQUssbUNBQW1DLFdBQVcseUJBQXlCO0FBQUEsUUFDOUUsRUFBRSxLQUFLLG9CQUFvQixXQUFXLEdBQUc7QUFBQSxNQUMzQztBQUFBLE1BQ0EsWUFBWSxPQUFPO0FBQ2pCLGNBQU0sT0FBTyxRQUFRLGtDQUFXLE1BQU0sVUFBVSxNQUFNLENBQUMsQ0FBQztBQUd4RCxZQUFJLENBQUMsS0FBSyxTQUFTLGFBQWEsS0FBSyxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBQ3pELGdCQUFNLEtBQUssR0FBRyxhQUFhLE1BQU0sT0FBTztBQUN4QyxnQkFBTSxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUU7QUFDMUIsZ0JBQU0sT0FBTyxPQUFPLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsS0FBSyxDQUFDO0FBQUEsUUFDcEUsT0FBTztBQUVMLGdCQUFNLE9BQU8sT0FBTyxPQUFPLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbEU7QUFLQSxjQUFNLGNBQWMsSUFBSSxPQUFPLGlCQUFpQjtBQUVoRCxjQUFNLGVBQWUsSUFBSSxPQUFPLFNBQVM7QUFHekMsWUFBSSxNQUFNLFNBQVMsUUFBUTtBQUN6QixpQkFBTztBQUFBLFlBQ0wsR0FBRztBQUFBLFlBQ0gsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFVBQ2I7QUFBQSxRQUNGLFdBQ1MsWUFBWSxLQUFLLE1BQU0sSUFBSSxHQUFHO0FBQ3JDLGlCQUFPO0FBQUEsWUFDTCxNQUFNO0FBQUEsWUFDTixXQUFXO0FBQUEsWUFDWCxVQUFVO0FBQUEsY0FDUjtBQUFBLGdCQUNFLEdBQUc7QUFBQSxjQUNMO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLFdBQ1MsYUFBYSxLQUFLLE1BQU0sSUFBSSxHQUFHO0FBQ3RDLGlCQUFPO0FBQUEsWUFDTCxNQUFNO0FBQUEsWUFDTixXQUFXO0FBQUEsWUFDWCxVQUFVO0FBQUEsY0FDUjtBQUFBLGdCQUNFLEdBQUc7QUFBQSxjQUNMO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLE9BQ0s7QUFDSCxpQkFBTztBQUFBLFlBQ0wsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsVUFBVTtBQUFBLGNBQ1I7QUFBQSxnQkFDRSxHQUFHO0FBQUEsY0FDTDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFNBQVM7QUFBQTtBQUFBLE1BRVAsZ0JBQWdCLENBQUMsSUFBSSxTQUFTLEtBQUssU0FBUyxvQkFBb0IsSUFDNUQsS0FDQTtBQUFBLE1BQ0osa0JBQWtCO0FBQUEsTUFDbEIsYUFBYTtBQUFBLE1BQ2IsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdmLG1CQUFtQjtBQUFBLFFBQ2pCLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxNQUNWO0FBQUE7QUFBQSxNQUVBLE1BQU0sZ0JBQWdCLElBQUk7QUFDeEIsY0FBTSxRQUFRLE1BQU0sZUFBZTtBQUFBLFVBQ2pDLFFBQVEsQ0FBQyxnQkFBZ0IsZUFBZTtBQUFBLFVBQ3hDLE9BQU8sT0FBTyxLQUFLLGdCQUFnQjtBQUFBLFFBQ3JDLENBQUM7QUFHRCxXQUFHLElBQUksQ0FBQyxhQUFhO0FBQ25CLG1CQUFTLFFBQVEsWUFBWSxDQUFDLE1BQU0sU0FBUztBQUMzQyxtQkFBTyxNQUFNLFdBQVcsTUFBTTtBQUFBLGNBQzVCO0FBQUEsY0FDQSxRQUFRO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGdCQUNQLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQSxtQkFBbUI7QUFBQSxZQUNyQixDQUFDO0FBQUEsVUFDSDtBQUFBLFFBQ0YsQ0FBQztBQUNELFdBQUcsSUFBSSxrQkFBa0I7QUFBQSxVQUN2QjtBQUFBLFVBQ0EsV0FBVyxpQkFBaUIsVUFBVSxpQkFBaUI7QUFBQSxZQUNyRCxRQUFRO0FBQUEsWUFDUixhQUFhLE9BQU8sRUFBRSxlQUFlLE9BQU87QUFBQSxVQUM5QyxDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQ0QsV0FBRyxJQUFJLGVBQWU7QUFFdEIsV0FBRyxJQUFJLGVBQWU7QUFBQSxVQUNwQixjQUFjLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLFVBQ3pCO0FBQUEsVUFDQSxxQkFBcUI7QUFBQSxRQUN2QixDQUFDO0FBRUQsV0FBRyxJQUFJLGVBQWU7QUFDdEIsV0FBRyxJQUFJLDBCQUEwQjtBQUFBLFVBQy9CLFNBQVMsQ0FBQyxTQUFpQixlQUFlLEtBQUssSUFBSTtBQUFBLFVBQ25ELE9BQU87QUFBQSxZQUNMLFFBQVE7QUFBQSxZQUNSLEtBQUs7QUFBQSxVQUNQO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0Esc0JBQXNCLGFBQWEsU0FBUyxJQUFJLFVBQVU7QUFFeEQsU0FBQyxNQUFNO0FBQ0wsY0FBSSxDQUFDLEdBQUcsU0FBUyxLQUFLO0FBQ3BCO0FBQ0YsZ0JBQU0sUUFBUSxTQUFTLElBQUksS0FBSztBQUNoQyxjQUFJLFVBQVUsV0FBVyxZQUFZLFNBQVMsQ0FBQyxZQUFZO0FBQ3pEO0FBQ0YsZ0JBQU0sT0FBTyxNQUFNLEtBQUs7QUFBQSxRQVExQixHQUFHO0FBRUgsY0FBTSxPQUFPLFNBQVMsYUFBYSxPQUFPO0FBRTFDLGVBQU8sRUFBRSxNQUFNLFlBQVk7QUFBQSxNQUM3QjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUdBLFFBQVEsRUFBRSxlQUFlLENBQUMsRUFBRTtBQUFBLEVBRTVCLFNBQVM7QUFBQTtBQUFBLElBRVAsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsSUFDQSxZQUFZO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFpQixLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFJRjtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFNBQVM7QUFBQSxJQUNuQixTQUFTO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUE7QUFBQSxRQUVOLHVCQUF1QjtBQUFBLFFBQ3ZCLGNBQWMsQ0FBQyxPQUFPO0FBR3BCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxXQUFXLEtBQUssRUFBRSxHQUFHO0FBRXZCLHNCQUFRLElBQUksT0FBTyxFQUFFO0FBQUEsWUFDdkI7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFFRjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
