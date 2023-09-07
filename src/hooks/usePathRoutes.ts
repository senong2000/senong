import { useRouter } from 'vue-router'

const router = useRouter()

const routesRegex = (path: string) => {
    const routeRegex = new RegExp(`^${import.meta.env.VITE_BASE_URL}/${path}/[^/]+$`);

    const routes = router.getRoutes().filter(i => routeRegex.test(i.path))

    console.log(routes)

    return routes
}



export const usePathRoutes = () => {
    return { routesRegex };
}