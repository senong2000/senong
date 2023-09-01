<script lang="ts" setup>

import { useTheme } from "@/hooks/useTheme"
const { isDark, toggleDark } = useTheme()

const router = useRouter()

const toPages = (path: string) => {
    router.push(`/${path}`)
}



</script>
<template>
    <v-toolbar class="navigation-bar" height="80">
        <v-toolbar-title>
            <v-btn variant="plain" @click="toPages('')">
                <span>
                    Senong
                </span>
            </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="plain" @click="toPages('blog')">
            Blog
        </v-btn>
        <v-btn variant="plain" @click="toPages('projects')">
            Projects
        </v-btn>
        <v-btn variant="plain" @click="toPages('tools')">
            Tools
        </v-btn>
        <v-btn variant="plain" @click="toPages('settings')">
            <v-icon>fas fa-gear</v-icon>
        </v-btn>
        <v-btn variant="plain" @click="toggleDark">
            <v-icon :icon="`${isDark ? 'fas fa-moon' : 'fas fa-sun'}`"></v-icon>
        </v-btn>
    </v-toolbar>
</template>
<style lang="scss" scoped></style>