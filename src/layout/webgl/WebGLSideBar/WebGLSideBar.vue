<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName, toggleDark, isDark } = useTheme()

const route = useRoute()
const router = useRouter()

type webgl = {
    index?: number
    title: string
    route: string
}

const webglTab = ref(0)

const webglInput = ref('')

onMounted(() => {
    webglTab.value = webgls.value.findIndex(i => i.title.toLocaleLowerCase() === route.path.split('/')[4]) > -1 ? webgls.value.findIndex(i => i.title.toLocaleLowerCase() === route.path.split('/')[4]) + 1 : 0

})

const toWebGL = (item: webgl) => {
    router.push(`${item.route}`)
}

const backToProjects = () => {
    router.push('/projects')
}

let webglsRef = ref<any[]>([])
webglsRef.value = router.getRoutes()
    .filter(i => i.path.startsWith(`/projects/webgl/`))
    .map(i => ({
        title: (i.name as string).split("-")[3],
        route: i.path
    }))
    .sort((a, b) => {
        const numA = parseFloat(a.title);
        const numB = parseFloat(b.title);
        return numA - numB;
    }).map((i, idx) => ({
        index: idx,
        title: i.title,
        route: i.route
    }))
webglsRef.value = [{ index: 0, title: 'home', route: '/projects/webgl' }, ...webglsRef.value]

const webgls = computed(() => {
    return webglsRef.value;
})

console.log('router', router.getRoutes())

console.log('webgls:', webgls.value)


const getWebGLs = webglsRef.value;

const searchWebGL = () => {
    if (webglInput.value === null) {
        webglsRef.value = getWebGLs
    } else {
        webglsRef.value = getWebGLs.filter(i => i.title.toLocaleLowerCase().includes(webglInput.value.toLocaleLowerCase()))
    }
}

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
                            <v-btn variant="plain" @click="toggleDark">
                                <v-icon :icon="`${isDark ? 'fas fa-moon' : 'fas fa-sun'}`"></v-icon>
                            </v-btn>
                        </div>
                    </template>

                    <v-text-field placeholder="webgl" variant="solo" hide-details="auto" v-model="webglInput"
                        @input="searchWebGL" @click:clear="searchWebGL" clearable persistent-clear persistent-hint>
                        <template v-slot:append-inner>
                            <v-icon icon="fas fa-magnifying-glass" size="small" @click="searchWebGL"></v-icon>
                        </template>
                    </v-text-field>
                    
                    <v-divider></v-divider>

                    <div class="d-flex flex-row">
                        <v-tabs w-full v-model="webglTab" direction="vertical" align-tabs="start"
                            selected-class="tab-active" hide-slider p-4>
                            <v-tab v-for="item, idx in webgls" :key="idx" @click="toWebGL(item)" :value="idx + 1"
                                class="my-2 b-rd-4!">
                                <span>{{ item.title }}</span>
                            </v-tab>
                        </v-tabs>
                    </div>



                </v-navigation-drawer>
                <v-main style="height:100vh"></v-main>
            </v-layout>
        </v-card>
    </div>
</template>
<style lang="scss">
.side-bar {

    .v-field--variant-solo {
        background: none;
        box-shadow: none;
        transition: all .3s;

    }



}
</style>