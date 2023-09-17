<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"

const { initTheme } = useTheme()

onMounted(() => {
    initTheme()
})

</script>
<template>
    <div class="shader-layout">
        <SideBar></SideBar>
        <CanvasMain></CanvasMain>
    </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "/src/styles/mixins.scss";

.shader-layout {
    @include clearfix;
    width: 100vw;
    min-height: 100vh;
    display: flex;
}
</style>