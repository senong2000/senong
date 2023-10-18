<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName, toggleDark, isDark } = useTheme()

const router = useRouter()
const route = useRoute()

type resume = {
    index?: number
    title: string
    route: string
}

const resumeTab = ref(0);

onMounted(() => {

})

const toResume = (item: resume) => {
    router.push(`${item.route}`)
}

const back = () => {
    router.push('/')
}

let resumesRef = ref<any[]>([])


const resumes = computed(() => {
    return resumesRef.value;
})



</script>
<template>
    <div class="side-bar">
        <v-card :theme="activeThemeName">
            <v-layout>
                <v-navigation-drawer floating permanent>
                    <template v-slot:prepend>
                        <div class="pa-2" flex>
                            <v-btn variant="plain" @click="back">
                                <v-icon icon="fas fa-left-long"></v-icon>
                            </v-btn>
                            <v-btn variant="plain" @click="toggleDark">
                                <v-icon :icon="`${isDark ? 'fas fa-moon' : 'fas fa-sun'}`"></v-icon>
                            </v-btn>
                        </div>

                    </template>
                    <v-divider></v-divider>
                    <div class="d-flex flex-row">
                        <v-tabs w-full v-model="resumeTab" direction="vertical" align-tabs="start"
                            selected-class="tab-active" hide-slider p-4>
                            <v-tab v-for="item, idx in resumes" :key="idx" @click="toResume(item)" :value="idx + 1"
                                class="my-2 b-rd-4!">
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
<style lang="scss">
.side-bar {

    .v-field--variant-solo {
        background: none;
        box-shadow: none;
        transition: all .3s;

    }



}
</style>