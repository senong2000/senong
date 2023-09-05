import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import NProgress from 'nprogress'

import virtualRoutes from 'virtual:generated-pages';

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

// vue-router 手动引入方式
// unplugin-pages 自动引入方式

const router = createRouter({
    history: createWebHistory(),
    // routes: [...routes, ...errorRoutes] 
    routes: virtualRoutes
});

router.beforeEach((to, from, next) => {
    NProgress.start()
    
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router;