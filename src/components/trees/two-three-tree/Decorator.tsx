import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Node from "./node";
import Queue from "../helpers/queue";
import { clearScene, getContentCoordinates, resize, textFont } from "../helpers/three-helpers";
import Sphere from "../helpers/sphere";

const singleNodeLen = 3;
const doubleNodeLen = 3;

class NodeMap<T> {

    private _level: number;
    map: Map<number, Node<T>[]>

    constructor(root: Node<T>) {
        this._level = 0;
        this.map = new Map<number, Node<T>[]>();
        this.build(root);
    }

    private build(root: Node<T>) {
        const queue: Queue<Node<T>> = new Queue<Node<T>>();
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            const size = queue.size;
            const array: Node<T>[] = [];

            for (let i = 0; i < size; i++) {
                const current = queue.dequeue();
                if (current) {
                    array.push(current);
                    current.children.forEach(item => {
                        queue.enqueue(item)
                    });
                }
            }

            this.map.set(this._level, array);
            this._level += 1;
        }
    }

    get level(): number {
        return (this._level === 0) ? 0 : this._level - 1;
    }

    log() {
        for (let nodes of this.map.values()) {
            const vals = nodes.map(node => node.vals.join("-"));
            console.log(vals.join(","));
        }
    }
}

function computeTotalLen<T>(nodes: Node<T>[]): number {

    const array: number[] = nodes.map(node => {
        switch (node.vals.length) {
            case 1: return singleNodeLen;
            case 2: return doubleNodeLen;
            default: throw new Error(`node len must be 1 or 2. len:[${node.vals.length}]`)
        }
    });

    return array.reduce((a, b) => a + b);
};

interface Params<T> {
    root: Node<T>;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    plane: THREE.Mesh;
    light: THREE.Light;
    marginY: number;
    radius: number;
    z: number;
    startY: number;
}

function setLastLevelNodesPosition<T>(nodeMap: NodeMap<T>) {
    const lasts: Node<T>[] = nodeMap.map.get(nodeMap.level)!;
    const total = computeTotalLen(lasts);

    let currentCount = -(total / 2);

    lasts.forEach(node => {
        switch (node.vals.length) {
            case 1:
                const end = (currentCount + singleNodeLen);
                node.x = (currentCount + end) / 2;
                currentCount += singleNodeLen;
                break;
            case 2:
                const end2 = (currentCount + doubleNodeLen);
                node.x = (currentCount + end2) / 2;
                currentCount += doubleNodeLen;
                break;
            default: break;
        }
    });
}

class SimpleSphere<T> extends Sphere {
    constructor(node: Node<T>, radius: number, color?: THREE.Color | string | number,) {
        super(node.x!, node.y!, node.z!, color, radius, 30, 30);
    }
}

function loadSpheres<T>(root: Node<T>, radius: number, renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {
    function helper<T>(node: Node<T>) {
        const color = node.vals.length === 2 ? "red" : "black";
        const sphere = new SimpleSphere(node, radius, color);
        scene.add(sphere);
        node.children.forEach(child => helper(child));
    }
    helper(root);
    renderer.render(scene, camera);
}

const lineMaterial = new THREE.LineBasicMaterial({ color: "gray" });
function loadLines<T>(root: Node<T>, renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {

    function helper<T>(node: Node<T>) {
        const start = new THREE.Vector3(node.x!, node.y!, node.z!);
        node.children.forEach(child => {
            const points = [start];
            points.push(new THREE.Vector3(child.x!, child.y!, node.z!));
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
        });
        node.children.forEach(child => helper(child));
    }
    helper(root);
    renderer.render(scene, camera);
}

const textMaterials = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 1, }); // front
function loadTexts<T>(root: Node<T>, renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {

    function helper<T>(node: Node<T>, font: THREE.Font) {
        const content = node.vals.join(",");
        const geometry = new THREE.TextGeometry(content, { font: font, size: textFont.size, height: textFont.height, });
        const mesh = new THREE.Mesh(geometry, textMaterials);
        const { x, y } = getContentCoordinates(content);
        mesh.position.set(node.x! + x, node.y! + y, node.z!);
        scene.add(mesh);
        node.children.forEach(child => helper(child, font));
    }

    const loader = new THREE.FontLoader();
    loader.load('/fonts/Roboto_Regular.json', function (font) {
        helper(root, font);
        renderer.render(scene, camera);
    });
}

export default <T extends unknown>({ root, radius, renderer, camera, scene, marginY, startY, z, plane, light }: Params<T>) => {

    clearScene(scene);
    scene.add(plane);
    scene.add(light);

    const nodeMap = new NodeMap(root);

    setLastLevelNodesPosition(nodeMap);
    root.populateTreeCoordinates(startY, marginY, z);

    loadSpheres(root, radius, renderer, camera, scene);
    loadLines(root, renderer, camera, scene);
    loadTexts(root, renderer, camera, scene);

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref && ref.current) {
            if (ref.current.children.length === 0) {
                ref.current.appendChild(renderer.domElement);
            }
        }
    }, [ref, renderer.domElement]);

    window.addEventListener('resize', () => resize(renderer, camera), false);

    return <div ref={ref} />;
};
