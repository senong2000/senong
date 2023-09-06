import { ref, computed } from "vue"
import { getActiveRain, setActiveRain } from "@/utils/cache/localStorage"

const DEFAULT_RAIN = true
export type Rain = typeof DEFAULT_RAIN | false

let rain: HTMLDivElement;
// @ts-ignore
let timer: NodeJS.Timeout;

const isRain = ref<Rain>(getActiveRain() || DEFAULT_RAIN)

const startRainFx = () => {
    let raindrop = document.createElement('div')

    let left = Math.floor(Math.random() * window.innerWidth)
    let size = Math.random() * 1.5;
    let duration = Math.random() * 1;

    raindrop.classList.add('raindrop')
    // rain.value.appendChild(raindrop)
    rain.appendChild(raindrop)
    raindrop.innerHTML = randomRaindropText();
    raindrop.style.left = left + 'px';
    raindrop.style.fontSize = 0.5 + size + 'em';
    raindrop.style.animationDuration = 10 + duration + 's';

    setTimeout(() => {
        // rain.value.removeChild(raindrop)
        rain.removeChild(raindrop)
    }, 10000)


}

const randomRaindropText = () => {
    const text = '01';
    const letter = text[Math.floor(Math.random() * text.length)];
    return letter;
}

const initRain = () => {
    rain = document.querySelector('.background-rain') as HTMLDivElement;
    setRain(DEFAULT_RAIN)
    timer = setInterval(() => {
        startRainFx()
    }, 50)
}

const setRain = (value: Rain) => {
    isRain.value = value
    setActiveRain(value)
}

const updateRain = () => {
    if (isRain.value === true) {
        setRain(false as Rain)
    } else if (isRain.value === false) {
        setRain(true as Rain)
    } else {
        console.warn('出现Code Rainy错误！')
    }
}

const toggleRain = () => {
    updateRain()
    console.log(isRain)
    if (isRain.value) {
        timer = setInterval(() => {
            startRainFx()
        }, 50)
    } else {
        clearInterval(timer)
    }
}

export function useRainFx() {
    return { isRain, initRain, toggleRain }
}