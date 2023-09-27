
<script lang="ts" setup>

import { ThreeCanvas } from '@/hooks/useThreeCanvas'
import { BufferAttribute, Color, MathUtils, Mesh, RepeatWrapping, ShaderMaterial, SphereGeometry, TextureLoader } from 'three';

import vertexShaderSource from './vertex.glsl';
import fragmentShaderSource from './fragment.glsl';

const canvas = ref<HTMLCanvasElement>();

const ctx = ref();

let threeCanvas: ThreeCanvas;

let sphere: any;
let uniforms: any;
let displacement: any;
let noise: any;

const initThreeCanvas = () => {
    threeCanvas = new ThreeCanvas(canvas.value!)
    threeCanvas.initThreeCanvas()

    threeCanvas.initThreeCanvasCallBack(() => {
        ctx.value = canvas.value?.querySelector('canvas')!.getContext('webgl2');
        threeCanvas.initStats();
        threeCanvas.initGui();
        initShader();

        threeCanvas.addObject(sphere);

        threeCanvas.setCameraPos(100, 100, 100)

        threeCanvas.animation(() => {
            threeCanvas.updateStats();
            shaderRender();
        })

    })

    threeCanvas.initGuiCallBack(() => {
        threeCanvas.initAxesHelper();
        threeCanvas.initGridHelper();
    })

}


const initShader = () => {
    uniforms = {
        'amplitude': { value: 1.0 },
        'color': { value: new Color(0xff2200) },
        'colorTexture': { value: new TextureLoader().load('/textures/water.jpg') }

    };

    uniforms['colorTexture'].value.wrapS = uniforms['colorTexture'].value.wrapT = RepeatWrapping;

    const shaderMaterial = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource
    });

    const radius = 50, segments = 128, rings = 64;

    const geometry = new SphereGeometry(radius, segments, rings);

    displacement = new Float32Array(geometry.attributes.position.count);
    noise = new Float32Array(geometry.attributes.position.count);

    for (let i = 0; i < displacement.length; i++) {

        noise[i] = Math.random() * 5;

    }

    geometry.setAttribute('displacement', new BufferAttribute(displacement, 1));

    sphere = new Mesh(geometry, shaderMaterial);
}


const shaderRender = () => {
    const time = Date.now() * 0.01;

    sphere.rotation.y = sphere.rotation.z = 0.01 * time;

    uniforms['amplitude'].value = 2.5 * Math.sin(sphere.rotation.y * 0.125);
    uniforms['color'].value.offsetHSL(0.0005, 0, 0);

    for (let i = 0; i < displacement.length; i++) {

        displacement[i] = Math.sin(0.1 * i + time);

        noise[i] += 0.5 * (0.5 - Math.random());
        noise[i] = MathUtils.clamp(noise[i], - 5, 5);

        displacement[i] += noise[i];

    }

    sphere.geometry.attributes.displacement.needsUpdate = true;
}


onMounted(() => {
    initThreeCanvas()
})


</script>

<template>
    <div class="canvas w-full h-full" ref="canvas">

    </div>
</template>
<style lang="scss" scoped></style>