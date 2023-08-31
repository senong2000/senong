<script lang="ts" setup>
import { NavigationBar, AppMain } from "./components"

</script>

<template>
    <div class="app-wrapper">
        <NavigationBar />
        <AppMain />
    </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "@/styles/mixins.scss";

.app-wrapper {
    @include clearfix;
    width: 100vw;
    height: 100vh;

}
</style>