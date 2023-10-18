<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"

const { initTheme } = useTheme()

onMounted(() => {
    initTheme()
})

</script>
<template>
    <div class="resume-layout">
        <ResumeSideBar></ResumeSideBar>
        <ResumeMain></ResumeMain>
    </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "/src/styles/mixins.scss";

.resume-layout {
    @include clearfix;
    width: 100vw;
    min-height: 100vh;
    display: flex;
}
</style>