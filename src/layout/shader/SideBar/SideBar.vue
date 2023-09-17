<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName, toggleDark, isDark } = useTheme()

const route = useRoute()
const router = useRouter()

type shader = {
    index?: number
    title: string
    route: string
}

const shaderTab = ref(0)

onMounted(() => {
    shaderTab.value = shaders.findIndex(i => i.title.toLocaleLowerCase() === route.path.split('/')[3]) > -1 ? shaders.findIndex(i => i.title.toLocaleLowerCase() === route.path.split('/')[3]) + 1 : 0
})

const toShader = (item: shader) => {
    router.push(`${item.route}`)
}

const backToProjects = () => {
    router.push('/projects')
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
    .filter(i => i.path.startsWith(`/projects/shader/`)).map(i => ({
        title: (i.name as string).split("-")[2],
        route: i.path
    }))
    .sort((a, b) => {
        const numA = parseFloat(a.title);
        const numB = parseFloat(b.title);
        return numA - numB;
    });



</script>
<template>
    <div class="side-bar">
        <v-card :theme="activeThemeName">
            <v-layout>
                <v-navigation-drawer floating permanent>
                    <template v-slot:prepend>
                        <div class="pa-2" flex>
                            <v-btn variant="plain" @click="backToProjects">
                                <v-icon icon="fas fa-left-long"></v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn variant="plain" @click="toggleDark">
                                <v-icon :icon="`${isDark ? 'fas fa-moon' : 'fas fa-sun'}`"></v-icon>
                            </v-btn>
                        </div>
                    </template>
                    <v-divider></v-divider>
                    <div class="d-flex flex-row">
                        <v-tabs w-full v-model="shaderTab" direction="vertical" align-tabs="start"
                            selected-class="tab-active" hide-slider p-4>

                            <v-tab @click="router.push('/projects/shader')" value="0" my-2>
                                <span>Home</span>
                            </v-tab>

                            <v-tab v-for="item, idx in shadersArr" :key="idx" @click="toShader(item)" :value="idx + 1" my-2
                                b-rd-16>
                                <span>{{ item.title }}</span>
                                {{ }}
                            </v-tab>
                        </v-tabs>
                    </div>
                </v-navigation-drawer>
                <v-main style="height:100vh"></v-main>
            </v-layout>
        </v-card>
    </div>
</template>
<style lang="scss" scoped>
.side-bar {
    .tab-active {}
}
</style>