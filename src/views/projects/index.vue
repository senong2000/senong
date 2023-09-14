<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName } = useTheme()

const route = useRoute()
const router = useRouter()

type project = {
    title: string
    cover: string
    route: string
}

const projects: project[] = [
    {
        title: 'Shader',
        cover: '/images/secret/porn/azumimizushima/cover.png',
        route: 'shader'
    }
]

projects.map(i => ({
    cover: import.meta.env.VITE_BASE_URL + i.cover
}))

console.log(projects)

</script>
<template>
    <div class="projects">
        <v-row no-gutters :theme="activeThemeName">
            <v-col cols="6" v-for="item, idx in projects" :key="idx">

                <v-card @click="router.push(`${route.path}/${item.route}`)" m-2 flex flex-items-center flex-justify-center>
                    <v-img :src="item.cover" cover aspect-ratio="16/9" class="projects-card-cover align-center" max-h-64>
                        <v-card-title class="projects-card-cover-title" uppercase flex justify-center>{{ item.title
                        }}</v-card-title>
                    </v-img>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss">
.projects {
    width: 60vw;

    &-card {
        &-cover {
            img {
                opacity: 0.3;
                margin-top: 0;
                margin-bottom: 0;
            }

            &-title {
                opacity: 1;
            }
        }
    }
}
</style>
