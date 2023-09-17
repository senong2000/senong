/**
 * @description threejs webgl 初始化 hook
 */

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";

export class ThreeCanvas {
    static instance: ThreeCanvas;

    private WIDTH: number = 0;
    private HEIGHT: number = 0;
    private MULTISAMPLING = 1;
    private frameHandle: number = 0;

    private canvas!: HTMLElement;
    private orbitControls!: OrbitControls;
    private renderer!: WebGLRenderer;
    private scene!: Scene;
    private camera!: PerspectiveCamera;


    constructor(canvas: HTMLElement) {
        this.canvas = canvas;
        ThreeCanvas.instance = this;
    }


    _initThreeCanvasCallBack = () => { };

    public initThreeCanvas = async () => {
        await this.countRect();
        await this.initScene();
        await this.initCamera()
        await this.initRenderer()
        await this.initOrbitControls()
        await this.initCanvasListener()
        await this.frameByFrame();

        this._initThreeCanvasCallBack()

    }

    public initThreeCanvasCallBack(call: VoidFunction) {
        this._initThreeCanvasCallBack = call;
    }

    private initScene() {
        this.scene = new Scene();
    }

    private initCamera() {
        this.camera = new PerspectiveCamera(75, this.WIDTH / this.HEIGHT, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 8;
        this.camera.lookAt(new Vector3(0, 0, 0));
    }

    private initRenderer() {
        this.renderer = new WebGLRenderer({
            alpha: !0,
            antialias: !0,
            preserveDrawingBuffer: true,
            logarithmicDepthBuffer: true,
        });

        this.renderer.setSize(this.WIDTH * this.MULTISAMPLING, this.HEIGHT * this.MULTISAMPLING);
        // this.renderer.setClearColor(this.BACKGROUND_COLOR, 1);
        this.canvas.append(this.renderer.domElement);
    }


    private initOrbitControls() {
        this.orbitControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.orbitControls.addEventListener('change', this.render);
    }



    private initCanvasListener() {
        // 随浏览器窗口大小发生变化
        window.addEventListener("resize", this.onWindowResize);

    }
    // 计算canvas 宽 高
    private countRect() {
        let width = this.canvas.offsetWidth;
        let height = this.canvas.offsetHeight;
        if (width != this.WIDTH || height != this.HEIGHT) {
            this.WIDTH = width;
            this.HEIGHT = height;
        };
    }
    private onWindowResize = () => {
        this.countRect();
        this.renderer.setSize(this.WIDTH * this.MULTISAMPLING, this.HEIGHT), this.camera.aspect = this.WIDTH / this.HEIGHT, this.camera.updateProjectionMatrix();
    }

    // 渲染场景
    private render = () => {
        this.renderer.render(this.scene, this.camera);
    };


    // animation
    private runAnimate = true;
    protected _animation: VoidFunction = () => { };
    /**
     * @description 逐帧渲染 frame(帧)
     */
    private frameByFrame = () => {
        this.frameHandle = requestAnimationFrame(this.frameByFrame);
        this.runAnimate && this._animation();
        this.orbitControls.update();
        this.render();
    }
    animation(call: VoidFunction) {
        this._animation = call;
    }

    /**
     *  @description 停止逐帧渲染
     */
    public stopFrame() {
        cancelAnimationFrame(this.frameHandle);
        this.frameHandle = 0;
    }

    /**
     * @description 移除Scene
     */
    _removeTheSceneCallBack = () => { };
    public removeTheScene = (obj: any) => {
        // console.log(obj)

        while (obj.children.length > 0) {
            this.removeTheScene(obj.children[0])
            obj.remove(obj.children[0]);
        }
        if (obj.geometry) obj.geometry.dispose()

        if (obj.material) {
            //in case of map, bumpMap, normalMap, envMap ...
            Object.keys(obj.material).forEach(prop => {
                if (!obj.material[prop])
                    return
                if (typeof obj.material[prop].dispose === 'function')
                    obj.material[prop].dispose()
            })
            obj.material.dispose()
        }

        this._removeTheSceneCallBack();

    }

    public removeTheSceneCallBack(call: VoidFunction) {
        this._removeTheSceneCallBack = call;
    }


    public gui!: GUI;
    _initGuiCallBack = () => { };
    public initGui() {
        if (process.env.NODE_ENV === "development") {
            //热更新会创建多个实例 删除之前的实例
            const oldInst = document.querySelector(".dg.main");
            oldInst?.parentElement?.removeChild(oldInst);
            // console.log("del", );
        }

        this.gui = new GUI();

        this._initGuiCallBack();
    }

    public initGuiCallBack(call: VoidFunction) {
        this._initGuiCallBack = call;
    }


    private stats!: Stats;
    public initStats = () => {
        //防止热重载初始化多个
        if (this.stats) return;
        const stats = new Stats();
        this.stats = stats;
        document.body.appendChild(stats.dom);
        stats.dom.style.top = "auto";
        stats.dom.style.bottom = "0";
        stats.dom.style.left = "auto";
        stats.dom.style.right = "0";
    }
    public updateStats = () => {
        this.stats && this.stats.update();
    }

    public addObject(...object: Object3D<THREE.Event>[]) {
        this.scene.add(...object);
    }
}

export const useThreeCanvas = () => {
    return {};
}