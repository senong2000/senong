<script lang="ts" setup>

import { ThreeCanvas } from '@/hooks/useThreeCanvas'
import { BufferGeometry, DirectionalLight, HemisphereLight, Mesh, MeshStandardMaterial, ShaderMaterial, SphereGeometry } from 'three';

import vertexShaderSource from './vertex.glsl';
import fragmentShaderSource from './fragment.glsl';
import fitFragmentShaderSource from './fitFragment.glsl'
import perlinNoiseFragmentShaderSource from './perlinNoiseFragment.glsl'
import smoothModFragmentFragmentShader from './smoothModFragment.glsl'

const canvas = ref<HTMLCanvasElement>()
const ctx = ref();

let threeCanvas: ThreeCanvas;

let material: ShaderMaterial | MeshStandardMaterial;
let mesh: Mesh<BufferGeometry>;
let appendUniforms: ShaderMaterial["uniforms"] = {
    iTime: { value: 3 },
    iStepCount: { value: 1 },
};

let config = {
    speed: 0.1
};

const initThreeCanvas = () => {
    threeCanvas = new ThreeCanvas(canvas.value!)
    threeCanvas.initThreeCanvas()

    threeCanvas.initThreeCanvasCallBack(() => {
        ctx.value = canvas.value?.querySelector('canvas')!.getContext('webgl2');
        threeCanvas.initStats();
        threeCanvas.initGui();
        initLights();

        initShader();

        threeCanvas.addObject(mesh);

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
    // 使用 ShaderMaterial 不受光照影响 失去物理效果

    // material = new ShaderMaterial({
    //     uniforms: {
    //         iTime: { value: 1 },
    //     },
    //     vertexShader: `
    //         uniform float iTime;
    //         varying vec3 vNormal;
    //         varying vec3 vColor;
    //         #define PI 3.141592653589793
    //         ${perlinNoiseFragmentShaderSource}
    //         ${smoothModFragmentFragmentShader}
    //         ${fitFragmentShaderSource}
    //         void main() {
    //             vec3 transformed = position;
    //             vNormal = normal;
    //             //vec3 myNormal = normal * 3. ; 
    //             vec3 myNormal = normal ;
    //             myNormal.y += iTime;
    //             float noiseValue = noise(myNormal) ;
    //             float pattern = fit(smoothMod(noiseValue * 5.,1.0,1.5),0.4,0.6,0.,1.);
    //             transformed += vec3(pattern) * normal;
    //             vColor = vec3(pattern);
    //             vec4 modelViewPosition = modelViewMatrix * vec4(transformed, 1.0);
    //             gl_Position = projectionMatrix * modelViewPosition;
    //         }`,
    //     fragmentShader: fragmentShaderSource
    // });
    // mesh = new Mesh(new SphereGeometry(3, 400, 400), material);
    // mesh.onAfterRender = () => {
    //     material.uniforms.iTime.value += 0.01;
    // };

    material = new MeshStandardMaterial({
        color: "#aaa",
        emissive: "#ff3311",
        metalness: 0.5,
        roughness: 0.5,
    });


    threeCanvas.gui
        ?.add(<any>material, "metalness", 0, 1)
        .step(0.01)
        .name("金属度");
    threeCanvas.gui
        ?.add(<any>material, "roughness", 0, 1)
        .step(0.01)
        .name("粗糙度");
    threeCanvas.gui
        ?.add(<any>config, "speed", 0, 1)
        .step(0.1)
        .name("运动速度");
    threeCanvas.gui
        ?.add(<any>appendUniforms.iStepCount, "value", 0, 32)
        .step(1)
        .name("分段数量");

    material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, appendUniforms);
        shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `
                #include <common>
                uniform float iTime;
                uniform float iStepCount;
                #define PI 3.141592653589793
                ${perlinNoiseFragmentShaderSource}
                ${smoothModFragmentFragmentShader}
                ${fitFragmentShaderSource}
            `
        );
        shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            `
                #include <begin_vertex>
                vec3 myNormal = normal;
                myNormal.y += iTime;
                float noiseValue = noise(myNormal);
                float pattern = fit(smoothMod(noiseValue * iStepCount,1.0,1.5),0.4,0.6,0.,1.);
                transformed += vec3(pattern) * normal;
            `
        );
    };

    mesh = new Mesh(new SphereGeometry(8, 320, 320), material);

}

const shaderRender = () => {

    mesh.onAfterRender = () => {
        appendUniforms.iTime.value += config.speed / 10;
    };
}


const initLights = () => {
    const lights: THREE.Object3D[] = [];

    const hemisphereLight = new HemisphereLight(
        0xdddddd,
        0xffffff,
        0.8
    );
    hemisphereLight.position.set(0, -2, 10);
    lights.push(hemisphereLight);

    // 平行光 默认从上往下照 position =  Object3D.DEFAULT_UP
    const directionalLight = new DirectionalLight(0xffffff, 0.45);
    lights.push(directionalLight);

    threeCanvas.addObject(...lights);
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