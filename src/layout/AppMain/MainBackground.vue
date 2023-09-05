<script lang="ts" setup>

const rain = ref()
// @ts-ignore
let timer: NodeJS.Timeout;

onMounted(() => {
    startRaining()
})

const initRain = () => {
    let raindrop = document.createElement('div')

    let left = Math.floor(Math.random() * window.innerWidth)
    let size = Math.random() * 1.5;
    let duration = Math.random() * 1;

    raindrop.classList.add('raindrop')

    rain.value.appendChild(raindrop)
    raindrop.innerHTML = randomRaindropText();
    raindrop.style.left = left + 'px';
    raindrop.style.fontSize = 0.5 + size + 'em';
    raindrop.style.animationDuration = 10 + duration + 's';

    setTimeout(() => {
        rain.value.removeChild(raindrop)
    }, 10000)
}

const startRaining = () => {
    timer = setInterval(() => {
        initRain()
    }, 50)
}

const randomRaindropText = () => {
    const text = '01';
    const letter = text[Math.floor(Math.random() * text.length)];
    return letter;
}





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
                transform: translateY(110vh) scale(1);
                opacity: 0.2;
            }

            100% {
                transform: translateY(110vh) scale(0);
                opacity: 0.1;
            }
        }


    }
}
</style>