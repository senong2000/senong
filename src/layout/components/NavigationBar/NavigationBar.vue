<script lang="ts" setup>


const router = useRouter()

const toPages = (path: string) => {
    router.push(`/${path}`)
}
</script>
<template>
    <v-card class="navigationbar" w-auto h-16 flat rounded="0">
        <v-toolbar>
            <v-toolbar-title @click="toPages('')">
                Senong
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
    </v-card>
</template>
<style lang="scss" scoped></style>