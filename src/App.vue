
<script lang="ts" setup>
import { NavigationBar, AppMain, BottomBar, MainBackground } from "@/layout"

import { useTheme } from "@/hooks/useTheme"
const { initTheme } = useTheme()
initTheme()

</script>

<template>
  <div class="app-wrapper">
    <NavigationBar />
    <AppMain />
    <MainBackground />
    <BottomBar />

  </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "@/styles/mixins.scss";

.app-wrapper {
  @include clearfix;
  width: 100vw;
  height: 100vh;
  font-size: 16px;
}
</style>.