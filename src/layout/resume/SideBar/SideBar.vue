<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
const { activeThemeName, toggleDark, isDark } = useTheme()

const route = useRoute()
const router = useRouter()

onMounted(() => {

})

const back = () => {
    router.push('/')
}

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