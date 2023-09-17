<script lang="ts" setup>

import { ThreeCanvas, useThreeCanvas } from '@/hooks/useThreeCanvas'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

const { } = useThreeCanvas()

const canvas = ref<HTMLElement>()

let threeCanvas: ThreeCanvas;

const initThreeCanvas = () => {
    threeCanvas = new ThreeCanvas(canvas.value!)
    threeCanvas.initThreeCanvas()

    threeCanvas.initThreeCanvasCallBack(() => {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        threeCanvas.addObject(cube);
        threeCanvas.initStats();


    })


    threeCanvas.animation(() => {
        threeCanvas.updateStats();
    })
}

onMounted(() => {
    initThreeCanvas()
})

onUnmounted(() => {

})

</script>
<template>
    <div class="canvas w-full h-full" ref="canvas">

    </div>
</template>
<style lang="scss" scoped></style>