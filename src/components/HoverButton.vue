<script lang="ts" setup>

const router = useRouter()
const route = useRoute()
const baseUrl = `/`

const showBackToTop = ref<boolean>(false)
const showBackTo = ref<boolean>(true)

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
    const scrollHeight = document.documentElement.scrollHeight
    console.log(scrollHeight)
    showBackToTop.value = scrollTop > 512
    showBackTo.value = scrollTop >= scrollHeight -64
}

const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const backTo = () => {
    router.push(route.path.split('/').slice(0, -1).join('/') || baseUrl)
}
</script>
<template>
    <div class="hover-button">
        <transition name="fade" mode="out-in">
            <div class="toTop" v-show="showBackToTop">
                <v-btn icon variant="tonal" size="small" @click="toTop">
                    <v-icon icon="fas fa-up-long"></v-icon>
                </v-btn>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div class="backTo" v-show="showBackTo" ml-4>
                <v-btn icon variant="tonal" size="small" @click="backTo">
                    <v-icon icon="fas fa-rotate-left"></v-icon>
                </v-btn>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" scoped>
.hover-button {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    display: flex;
    // flex-direction: column;
    transition: all .3s;
}
</style>
