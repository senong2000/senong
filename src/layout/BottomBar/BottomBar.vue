<script lang="ts" setup>

const route = useRoute()
const router = useRouter()
console.log()

const toSecret = () => {
    if (route.name === 'blog') router.push('/blog/secret');
}


</script>
<template>
    <footer class="footer proseflex slide-enter animate-delay-1200!">
        <span class="text-sm op50">2023 - PRESENT © <span @click="toSecret">Senong</span></span>
        <div class="flex-auto" />
    </footer>
</template>
<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    right: 0;
}
</style>