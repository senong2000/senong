<script lang="ts" setup>

const rain = ref()

onMounted(() => {
    let raindrop = document.createElement('div')
    raindrop.classList.add('text')

    rain.value.appendChild(raindrop)

    

})


</script>
<template>
    <div class="background">
        <div class="background-name" font-semibold>
            <span>Senong</span>
        </div>
        <div class="background-rain" ref="rain">

        </div>
    </div>
</template>
<style lang="scss" scoped>
.background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    pointer-events: none;

    &-name {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            color: $PrimaryColor-default;
            font-size: 16rem;
            letter-spacing: 2rem;
            opacity: 0.1;
            user-select: none;
            transition: all .5s;
            z-index: 10;

        }

        span:hover {
            opacity: 0.5;
        }
    }


}
</style>