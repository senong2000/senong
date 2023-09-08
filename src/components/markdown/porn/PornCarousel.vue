<script lang="ts" setup>
const router = useRouter()
const route = useRoute()

const postRouteRegExp = new RegExp(`^${route.path}`)
const routes = router.getRoutes()
    .filter(i => postRouteRegExp.test(i.path) && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
    .filter(i => !i.path.endsWith('.html'))
    .map(i => ({ images: i.meta.frontmatter.images, }))

const images = parseInt(routes[0].images)


const imgSrc = '/images' + route.path.replace(/^\/blog/, '')

</script>
<template>
    <div class="porn-carousel">
        <v-carousel hide-delimiters show-arrows="hover" progress="default" cycle interval="3000">
            <v-carousel-item v-for="image in images" :src="`${imgSrc}/${image}.png`" aspect-ratio="16/9"
                height="512"></v-carousel-item>
        </v-carousel>
    </div>
</template>
<style lang="scss" scoped></style>