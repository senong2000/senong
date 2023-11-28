<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { useRainFx } from "@/hooks/useRainFx"

const { initTheme } = useTheme()
const { initRain, uninstallRainFx } = useRainFx()

onMounted(() => {
    initTheme()
    initRain()
})

onUnmounted(() => {
    uninstallRainFx()
})

</script>
<template>
    <div class="website-layout">
        <NavigationBar />
        <AppMain />
        <MainBackground />
        <BottomBar />
        <HoverButton />
    </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "/src/styles/mixins.scss";

.website-layout {
    @include clearfix;
    width: 100vw;
    min-height: 100vh;
}
</style>
