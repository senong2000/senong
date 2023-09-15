
<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { useRainFx } from "@/hooks/useRainFx"

const { initTheme } = useTheme()
const { initRain } = useRainFx()

onMounted(() => {
  initTheme()
  initRain()

})

</script>

<template>
  <div class="app-wrapper">
    <NavigationBar />
    <AppMain />
    <MainBackground />
    <BottomBar />
    <ToTopButton />

  </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "@/styles/mixins.scss";

.app-wrapper {
  @include clearfix;
  width: 100vw;
  min-height: 100vh;
}
</style>.