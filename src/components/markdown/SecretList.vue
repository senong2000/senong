<script lang="ts" setup>
import { Post } from '@/types/markdown';

const route = useRoute()
const router = useRouter()

const postRouteRegExp = new RegExp(`^${route.path}/([^/]+)$`)

const routes: Post[] = router.getRoutes()
    .filter(i => postRouteRegExp.test(i.path) && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
    .filter(i => !i.path.endsWith('.html'))
    .map(i => ({
        path: i.meta.frontmatter.redirect || i.path,
        title: i.meta.frontmatter.title,
        date: i.meta.frontmatter.date,
        lang: i.meta.frontmatter.lang,
        duration: i.meta.frontmatter.duration,
        recording: i.meta.frontmatter.recording,
        upcoming: i.meta.frontmatter.upcoming,
        redirect: i.meta.frontmatter.redirect,
        type: i.meta.frontmatter.type
    }))

// console.log(routes)

</script>
<template>
    <div class="secret-list">
        <div v-for="route in routes" :key="route.path">
            <button @click="router.push(route.path)">
                {{ route.title }}
            </button>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>