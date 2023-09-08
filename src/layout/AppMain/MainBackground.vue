<script lang="ts" setup>

</script>

<template>
    <div class="background">
        <div class="background-name" font-semibold>
            <span>Senong</span>
        </div>
        <div class="background-rain" ref="rain"></div>
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
            opacity: 0.1;
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

<style lang="scss">
.background {
    &-rain {
        .raindrop {
            position: absolute;
            height: 1.5rem;
            line-height: 1.5rem;
            text-transform: uppercase;
            color: $PrimaryColor-default;
            text-shadow: 0 0 5px $PrimaryColor-default, 0 0 15px $PrimaryColor-default, 0 0 30px $PrimaryColor-default;
            transform-origin: bottom;
            animation: animate 1s linear forwards;
            opacity: 0.3;
            transition: all .3s;
        }

        @keyframes animate {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.3;
            }

            70% {
                transform: translateY(calc(100vh - 1.5rem)) scale(1);
                opacity: 0.2;
            }

            100% {
                transform: translateY(calc(100vh - 1.5rem)) scale(0);
                opacity: 0.1;
            }
        }


    }
}
</style>