<script lang="ts" setup>

const route = useRoute()

</script>

<template>
    <div class="background slide-enter-50 ">
        <div class="background-name" font-semibold v-if="route.path === '/'">
            <span>Senong</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;

    &-name {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            color: $PrimaryColor-default;
            font-size: 16rem;
            letter-spacing: 2rem;
            opacity: 0.05;
            user-select: none;
            transition: all .5s;
            z-index: 10;
            pointer-events: none;
        }

        span:hover {
            opacity: 0.5;
        }
    }


}
</style>