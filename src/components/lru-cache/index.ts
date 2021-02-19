import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ArrowStyles, NodeStyles } from "./commons/styles";
import DoubleLinkedList from "./doubly-linked-list";
import DoubleLinkedListNode from "./doubly-linked-list/node";
import HashMap from "./hashmap";
import { toMemoryAddress } from "./commons/helpers";

let memoryAddress = 2;
const FONT_LOCATION = '/fonts/Roboto_Regular.json';

export default class LRUCache<T> {

    private DURATION: number = 1;
    private NODE_MARGIN: number = 8;

    private DOUBLY_LINKED_LIST_START_POSITION = new THREE.Vector3(-70, 43, 0);
    private DOUBLY_LINKED_LIST_ARROW_STYLES: ArrowStyles = { color: "#4caf50", headLength: 3, headWidth: 1.5 };
    private DOUBLY_LINKED_LIST_NODE_STYLES = { color: "#4caf50", width: 10, height: 6, textGeometryParameters: { size: 2, height: 0.02 }, textColor: 'white' };

    private HASH_MAP_BUCKETS = 3;
    private HASH_MAP_START_POSITION = new THREE.Vector3(-70, 25, 0);
    private HASH_MAP_ARROW_STYLES: ArrowStyles = { color: "rgb(217, 200, 159)", headLength: 3, headWidth: 1.5 };
    private HASH_MAP_NODE_STYLES = { color: "rgb(217, 200, 159)", width: 10, height: 6, textGeometryParameters: { size: 2, height: 0.02 }, textColor: 'white' };

    private CONTROLS_ROTATE_SPEEND = 0.5
    private CONTROLS_MIN_DISTANCE = 100;
    private CONTROLS_MAX_DISTANCE = 300;

    private readonly capacity: number;
    private _currentSize: number;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    private doublyLinkedList?: DoubleLinkedList<T>;
    private hashMap?: HashMap<DoubleLinkedListNode<T>>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this._currentSize = 0;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.scene = this.createScene();
        this.camera = this.createCamera(this.scene);

        this.registeGrid(this.scene);
        this.registeControls(this.camera, this.renderer);
        this.afterInit(this.scene);

        this.get = this.get.bind(this);
        this.render = this.render.bind(this);
    }

    private createScene(): THREE.Scene {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#f5f4ed");
        return scene;
    }

    private createCamera(scene: THREE.Scene): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 0, 95);
        scene.add(camera);
        return camera;
    }

    private registeGrid(scene: THREE.Scene) {
        const gridHelper = new THREE.GridHelper(2000, 100, "white", "white");
        const material = gridHelper.material;
        if (material instanceof THREE.Material) {
            material.opacity = 0.95;
            material.transparent = true;
        }
        gridHelper.position.y = - 199;
        scene.add(gridHelper);
    }

    private afterInit(scene: THREE.Scene) {
        const self = this;
        new THREE.FontLoader().load(FONT_LOCATION, function (font) {
            self.doublyLinkedList = self.createDoublyLinkedList(font, scene);
            self.hashMap = self.createHashMap(font, scene);
            self.render();
        });
    }

    private createDoublyLinkedList(font: THREE.Font, scene: THREE.Scene) {
        return new DoubleLinkedList<T>(
            scene,
            this.NODE_MARGIN,
            this.DOUBLY_LINKED_LIST_START_POSITION,
            this.DOUBLY_LINKED_LIST_ARROW_STYLES,
            this.createDoublyLinkedListNodeStyles(font),
            this.render,
            this.DURATION
        );
    }

    private createDoublyLinkedListNodeStyles(font: THREE.Font): NodeStyles {
        const textGeometryParameters = { ...this.DOUBLY_LINKED_LIST_NODE_STYLES.textGeometryParameters, font };
        return { ...this.DOUBLY_LINKED_LIST_NODE_STYLES, textGeometryParameters };
    }

    private createHashMap(font: THREE.Font, scene: THREE.Scene) {
        return new HashMap<DoubleLinkedListNode<T>>(
            scene,
            this.render,
            this.HASH_MAP_START_POSITION,
            this.DURATION,
            this.HASH_MAP_BUCKETS,
            this.HASH_MAP_ARROW_STYLES,
            this.createHashMapNodeStyles(font),
        );
    }

    private createHashMapNodeStyles(font: THREE.Font): NodeStyles {
        const textGeometryParameters = { ...this.HASH_MAP_NODE_STYLES.textGeometryParameters, font };
        return { ...this.HASH_MAP_NODE_STYLES, textGeometryParameters };
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    };

    private registeControls(camera: THREE.Camera, renderer: THREE.Renderer): void {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.rotateSpeed = this.CONTROLS_ROTATE_SPEEND;
        controls.minDistance = this.CONTROLS_MIN_DISTANCE;
        controls.maxDistance = this.CONTROLS_MAX_DISTANCE;
        controls.update();
        controls.addEventListener('change', () => this.render());
    }

    async get(key: number): Promise<T | undefined> {
        if (!this.hashMap) {
            return undefined;
        }

        if (!this.doublyLinkedList) {
            return undefined;
        }

        const current = this.hashMap.get(key);
        if (current) {
            const node = await this.getDoubleLinkedListNode(key);
            if (node) {
                await this.doublyLinkedList.moveToHead(node);
            }
            return new Promise(resolve => resolve(current.data));;
        }
    }

    private async getDoubleLinkedListNode(key: number): Promise<DoubleLinkedListNode<T> | undefined> {
        if (!this.hashMap) {
            return undefined;
        }

        if (!this.doublyLinkedList) {
            return undefined;
        }

        return new Promise((resolve, reject) => {
            if (this.hashMap) {
                resolve(this.hashMap.get(key));
            } else {
                reject()
            }
        });
    }

    async put(key: number, data: T, display: string): Promise<number> {

        if (!this.hashMap) {
            return this.currentSize;
        }

        if (!this.doublyLinkedList) {
            return this.currentSize;
        }

        const current = this.hashMap.get(key);
        if (current) {
            const node = await this.getDoubleLinkedListNode(key);
            if (node) {
                await this.doublyLinkedList.moveToHead(node);
            }
            return this.currentSize;
        }

        if (this.currentSize === this.capacity) {
            const deleted = await (this.doublyLinkedList.deleteLast());
            if (deleted) {
                await this.hashMap.delete(deleted.key);
                this._currentSize -= 1;
            }
        }

        this._currentSize += 1;

        const hashMapDisplay = toMemoryAddress(memoryAddress);
        const node = await this.doublyLinkedList.insertFirst(data, display, memoryAddress, key);
        this.hashMap.push(key, node, hashMapDisplay);

        memoryAddress += 1;

        return this.currentSize;
    }

    public resize(div: HTMLDivElement): void {
        this.resizeWithWidthAndHeight(div.clientWidth, window.innerHeight);
    };

    private resizeWithWidthAndHeight(width: number, height: number): void {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    get currentSize(): number {
        return this._currentSize;
    }

    get domElement() {
        return this.renderer.domElement;
    }
}
