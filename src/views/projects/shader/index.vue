<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName } = useTheme()

const route = useRoute()
const router = useRouter()

type shader = {
    index?: number
    title: string
    route: string
}

const toShader = (item: shader) => {

    router.push(`${item.route}`)
}

const shadersArr = computed(() => {
    return shaders.map((i, idx) => ({
        index: idx,
        title: i.title,
        route: i.route
    }))
})

const routes = router.getRoutes()
const shaders: shader[] = routes
    .filter(i => i.path.startsWith(`${route.path}/`)).map(i => ({
        title: (i.name as string).split("-")[2],
        route: i.path
    }))

// console.log(shaders)

</script>
<template>
    <div class="shader" flex>
        <v-card :theme="activeThemeName" v-for="item, idx in shadersArr" :key="idx" @click="toShader(item)">
            <span>{{ item.title }}</span>
        </v-card>
    </div>
</template>
<style lang="scss" scoped>
.shader {
    width: 60vw;
}
</style>