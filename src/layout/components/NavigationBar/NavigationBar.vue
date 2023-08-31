<script lang="ts" setup>


const router = useRouter()

const toPages = (path: string) => {
    router.push(`/${path}`)
}
</script>
<template>
    <v-toolbar class="bg-transparent">
        <v-toolbar-title>
            <v-chip size="x-large" variant="text" @click="toPages('')">
                Senong
            </v-chip>
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
        <v-btn @click="toPages('settings')">
            <v-icon>mdi-cog</v-icon>
        </v-btn>
    </v-toolbar>
</template>
<style lang="scss" scoped></style>