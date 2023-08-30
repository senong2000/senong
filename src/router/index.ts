import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Layout = () => import("@/layout/layout.vue")

const errorRoutes: Array<RouteRecordRaw> = [
    {
        path: "/403",
        component: () => import("@/views/error/403.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/404",
        component: () => import("@/views/error/404.vue"),
        meta: {
            hidden: true
        },
        alias: "/:pathMatch(.*)*"
    },
]

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        meta: {
            title: '首页',
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/Home/home.vue'),
                meta: {
                    title: '首页',
                }
            }

        ],
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...errorRoutes]
});
export default router;