<script lang="ts" setup>

</script>
<template>
    <div class="shader-layout">
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scoped>
// 样式格式化
@import "/src/styles/mixins.scss";

.shader-layout {
    @include clearfix;
    width: 100vw;
    min-height: 100vh;
}
</style>