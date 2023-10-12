<script lang="ts" setup>

import { useTheme } from "@/hooks/useTheme"
import { useRainFx } from "@/hooks/useRainFx"

const { isDark, toggleDark } = useTheme()

const { isRain, toggleRain } = useRainFx()

const router = useRouter()

const logo = `${import.meta.env.VITE_BASE_URL}` + '/logo.png';

console.log(logo);

const toPages = (path: string) => {
    router.push(`${path}`)
}

</script>
<template>
    <v-toolbar class="navigation-bar" height="80">
        <v-toolbar-title>
            <v-btn variant="plain" @click="toPages('/')">
                <span>
                    Senong
                </span>
            </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="plain" @click="toPages('/blog')">
            <v-icon><i class="fas fa-clipboard"></i></v-icon>
            <v-tooltip text="Blog" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
        <v-btn variant="plain" @click="toPages('/resume')">
            <v-icon>fas fa-file</v-icon>
            <v-tooltip text="Resume" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
        <v-btn variant="plain" @click="toPages('/projects')">
            <v-icon><i class="fas fa-project-diagram"></i></v-icon>
            <v-tooltip text="Projects" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
        <v-btn variant="plain" @click="toPages('/tools')">
            <v-icon>fas fa-tools</v-icon>
            <v-tooltip text="Tools" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
        <v-btn variant="plain" @click="toPages('settings')">
            <v-icon>fas fa-gear</v-icon>
            <v-tooltip text="Settings" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
        <v-btn variant="plain" @click="toggleRain">
            <v-icon :icon="`${isRain ? 'fas fa-droplet' : 'fas fa-droplet-slash'}`"></v-icon>
            <v-tooltip text="CodeRain" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
        <v-btn variant="plain" @click="toggleDark">
            <v-icon :icon="`${isDark ? 'fas fa-moon' : 'fas fa-sun'}`"></v-icon>
            <v-tooltip text="Theme" activator="parent" location="bottom"></v-tooltip>
        </v-btn>
    </v-toolbar>
</template>
<style lang="scss" scoped></style>