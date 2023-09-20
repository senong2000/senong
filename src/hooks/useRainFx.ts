import { getCodeRain, setCodeRain } from "@/utils/cache/localStorage"

let rain: HTMLDivElement;
// @ts-ignore
let timer: NodeJS.Timeout;

const isRain = ref<boolean>(getCodeRain())

const startRainFx = () => {
    let raindrop = document.createElement('div')

    let left = Math.floor(Math.random() * window.innerWidth)
    let size = Math.random() * 1.5;
    let duration = Math.random() * 1;
    raindrop.classList.add('raindrop')

    rain.appendChild(raindrop)
    raindrop.innerHTML = randomRaindropText();
    raindrop.style.left = left + 'px';
    raindrop.style.fontSize = 0.5 + size + 'em';
    raindrop.style.animationDuration = 10 + duration + 's';
    raindrop.style.pointerEvents = 'none';

    setTimeout(() => {
        rain.removeChild(raindrop)
    }, 10000)
}

const randomRaindropText = () => {
    const text = '01';
    const letter = text[Math.floor(Math.random() * text.length)];
    return letter;
}

const initRain = () => {
    setCodeRain(isRain.value ? 'true' : 'false')

    rain = document.createElement('div')
    rain.className = 'rainfx'
    document.body.appendChild(rain)

    if (isRain.value) {
        timer = setInterval(() => {
            startRainFx()
        }, 200)
    }

}

const setRain = (value: string) => {

    value === 'true' ? isRain.value = true : isRain.value = false
    setCodeRain(value)
}

const updateRain = () => {
    if (isRain.value) {
        setRain('false')
    } else if (!isRain.value) {
        setRain('true')
    } else {
        console.warn('出现Code Rainy错误！')
    }
}

const toggleRain = () => {
    updateRain()

    if (isRain.value) {
        timer = setInterval(() => {
            startRainFx()
        }, 50)
    } else {
        clearInterval(timer)
    }
}

const uninstallRainFx = () => {
    clearInterval(timer)
    document.body.removeChild(rain)
}

export const useRainFx = () => {
    return { isRain, initRain, toggleRain, uninstallRainFx }
}