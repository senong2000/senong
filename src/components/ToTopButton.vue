<script lang="ts" setup>

const showBackToTop = ref<boolean>(false)


onMounted(() => {
    document.addEventListener('scroll', handleScroll)
})

// 取消滚动事件
onUnmounted(() => {
    document.removeEventListener('scroll', handleScroll)
})

// 监听滚动事件
const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    showBackToTop.value = scrollTop > 512
}

const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>
<template>
    <transition name="fade" mode="out-in">
        <div class="toTop" v-show="showBackToTop">
            <v-btn icon variant="tonal" size="small" @click="toTop">
                <v-icon icon="fas fa-up-long"></v-icon>
            </v-btn>
        </div>
    </transition>
</template>
<style lang="scss" scoped>
.toTop {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
}
</style>