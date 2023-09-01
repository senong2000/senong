<script lang="ts" setup>
const router = useRouter()

const toPages = (path: string) => {
    router.push(`/blog/docs/${path}`)
}
</script>
<template>
    <div class="blog">
        <v-btn @click="toPages('')">index</v-btn>
    </div>
</template>
<style lang="scss" scoped></style>