import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';

import NProgress from 'nprogress'

import virtualRoutes from 'virtual:generated-pages';
import generatedRoutes from 'virtual:generated-pages'

import autoRoutes from 'pages-generated'
import { setupRouterScroller } from 'vue-router-better-scroller'

// const Layout = () => import("@/layout/layout.vue")

// const errorRoutes: Array<RouteRecordRaw> = [
//     {
//         path: "/403",
//         component: () => import("@/views/error/403.vue"),
//         meta: {
//             hidden: true
//         }
//     },
//     {
//         path: "/404",
//         component: () => import("@/views/error/404.vue"),
//         meta: {
//             hidden: true
//         },
//         alias: "/:pathMatch(.*)*"
//     },
// ]

// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Layout,
//         meta: {
//             title: '首页',
//         },
//         children: [
//             {
//                 path: '/',
//                 name: 'Home',
//                 component: () => import('@/views/home/home.vue'),
//                 meta: {
//                     title: '首页',
//                 }
//             }

//         ],
//     },
//     {
//         path: '/blog',
//         name: 'Blog',
//         component: Layout,
//         meta: {
//             title: '博客',
//         },
//         children: [
//             {
//                 path: '/blog',
//                 name: 'Blog',
//                 component: () => import('@/views/blog/blog.vue'),
//                 meta: {
//                     title: '博客',
//                 }
//             }

//         ],
//     },
//     {
//         path: '/projects',
//         name: 'Projects',
//         component: Layout,
//         meta: {
//             title: '项目',
//         },
//         children: [
//             {
//                 path: '/projects',
//                 name: 'Projects',
//                 component: () => import('@/views/projects/projects.vue'),
//                 meta: {
//                     title: '项目',
//                 }
//             }

//         ],
//     },
//     {
//         path: '/tools',
//         name: 'Tools',
//         component: Layout,
//         meta: {
//             title: '工具',
//         },
//         children: [
//             {
//                 path: '/tools',
//                 name: 'Tools',
//                 component: () => import('@/views/tools/tools.vue'),
//                 meta: {
//                     title: '工具',
//                 }
//             },
//             {
//                 path: '/tools/bonfire',
//                 name: 'Bonfire',
//                 component: () => import('@/views/tools/bonfire/bonfire.vue'),
//                 meta: {
//                     title: '篝火',
//                 }
//             }

//         ],
//     },
//     {
//         path: '/settings',
//         name: 'Settings',
//         component: Layout,
//         meta: {
//             title: '设置',
//         },
//         children: [
//             {
//                 path: '/settings',
//                 name: 'Settings',
//                 component: () => import('@/views/settings/settings.vue'),
//                 meta: {
//                     title: '设置',
//                 }
//             }
//         ],
//     },

// ]

// const routes = autoRoutes.map((i) => {
//     return {
//         ...i,
//         alias: i.path.endsWith('/')
//             ? `${i.path}index.html`
//             : `${i.path}.html`,
//     }
// })

// const html = document.querySelector('html')!
// setupRouterScroller(router, {
//     selectors: {
//         html(ctx) {
//             // only do the sliding transition when the scroll position is not 0
//             if (ctx.savedPosition?.top)
//                 html.classList.add('no-sliding')
//             else
//                 html.classList.remove('no-sliding')
//             return true
//         },
//     },
//     behavior: 'auto',
// })

// vue-router 手动引入方式
// unplugin-pages 自动引入方式


virtualRoutes.push({ path: '/:path(.*)', redirect: '/404' })

// console.log(virtualRoutes)
const router = createRouter({
    history: createWebHistory(`${import.meta.env.VITE_BASE_URL}`),
    // history: createWebHashHistory(),
    // routes: [...routes, ...errorRoutes] 
    routes: virtualRoutes
    // routes: routes
});


router.beforeEach((to, from, next) => {
    NProgress.start()
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 如果不支持
    if (!isAppearanceTransition || !event) {
        next()
        return
    }

    if (from.path === '/blog') {
        // @ts-expect-error experimental API
        const transition = document.startViewTransition(() => {
            next()
        })
    } else {

        next()
    }

})

router.afterEach(async (to, from) => {
    await new Promise(resolve => setTimeout(resolve, 100)) // 等待 100 毫秒
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    NProgress.done()
})

// 监听浏览器的后退事件
window.onpopstate = async (event) => {
    if (event.state) {
        await nextTick()
        setTimeout(() => {
            window.scrollTo({
                top: event.state.scroll.top,
                behavior: 'smooth',
            })
        }, 600)
    }

}



export default router;