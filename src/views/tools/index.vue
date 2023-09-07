<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
</script>
<template>
    <div class="tools">
        <v-btn @click="router.push(`${route.path}/todolist`)">todolist</v-btn>
    </div>
</template>
<style lang="scss" scoped></style>