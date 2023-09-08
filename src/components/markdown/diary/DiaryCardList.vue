<script lang="ts" setup>
import { Post } from '@/types/markdown';
import { formatDate } from '@/utils/date'

const router = useRouter()
const route = useRoute()

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
        type: i.meta.frontmatter.type,
    }))

</script>
<template>
    <div class="porn-card">
        <v-card v-for="route in routes" class="mx-auto" :key="route.title" @click="router.push(route.path)">
            <v-card-actions>
                <v-card-title class="text-black" v-text="route.title"></v-card-title>
                <span> {{ formatDate(route.date, false) }} </span>
                <v-spacer></v-spacer>
                <v-btn size="large" color="surface-variant" variant="plain" icon="fas fa-forward"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<style lang="scss" >
.porn-card {
    &-cover {
        img {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
}
</style>