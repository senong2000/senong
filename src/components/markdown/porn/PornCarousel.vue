<script lang="ts" setup>
const router = useRouter()
const route = useRoute()

import { useTheme } from '@/hooks/useTheme';

const { activeThemeName } = useTheme()

const postRouteRegExp = new RegExp(`^${route.path}`)
const routes = router.getRoutes()
    .filter(i => postRouteRegExp.test(i.path) && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
    .filter(i => !i.path.endsWith('.html'))
    .map(i => ({ images: i.meta.frontmatter.images, }))

const images = parseInt(routes[0].images)

const imgSrc = `${import.meta.env.VITE_BASE_URL}/images` + route.path.replace(/^\/blog/, '')

</script>
<template>
    <div class="porn-carousel">
        <v-carousel hide-delimiters show-arrows="hover" progress="default" cycle interval="3000" :theme="activeThemeName">
            <v-carousel-item v-for="image in images" :lazy-src="`${imgSrc}/${image}.png`" :src="`${imgSrc}/${image}.png`"
                aspect-ratio="16/9" height="512">
                <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>
<style lang="scss" scoped></style>