<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName } = useTheme()

const route = useRoute()
const router = useRouter()

type project = {
    index?: number
    title: string
    cover: string
    route: string
}

const projectsArr: project[] = [
    {
        title: 'Shader',
        cover: '/images/secret/porn/azumimizushima/cover.png',
        route: 'shader'
    }
]

const projects = computed(() => {
    return projectsArr.map(i => ({
        title: i.title,
        cover: import.meta.env.VITE_BASE_URL + i.cover,
        route: i.route
    }))
})


</script>
<template>
    <div class="projects">
        <v-row no-gutters>
            <v-col cols="6" v-for="item, idx in projects" :key="idx">
                <v-card :theme="activeThemeName" :ripple="true" class="projects-card"
                    @click="router.push(`${route.path}/${item.route}`)" m-2 flex flex-items-center flex-justify-center>
                    <v-img :src="item.cover" cover aspect-ratio="16/9" class="projects-card-cover align-center" max-h-64>
                        <span class="projects-card-cover-title" uppercase flex justify-center text-8>{{ item.title
                        }}</span>
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
                transition: all .3s;
                opacity: 0.6;
            }

            &-title {
                opacity: 1;
            }
        }
    }

    &-card:hover &-card-cover {
        &-title {
            opacity: 1;
        }

        img {
            opacity: 0.3;
        }

    }
}
</style>
