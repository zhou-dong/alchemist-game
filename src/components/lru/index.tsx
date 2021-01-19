import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import DoubleLinkedList from "./doubly-linked-list";

const TEXT_FONT = { size: 2, height: 0.02 };

const HASHMAP_ITEM_WIDTH = 7;
const HASHMAP_ITEM_HEIGHT = 4;
const HASHMAP_ROWS = 5;
const HASHMAP_BUCKET_SIZE = 8;
const HASHMAP_POSITION = { x: -35, y: 15, z: 0 };

const createBackgroundColor = () => `rgba(0, 127, 127, ${Math.random() * 0.5 + 0.25})`;
const hashMapMaterial = new THREE.MeshBasicMaterial({ color: createBackgroundColor(), side: THREE.DoubleSide });
const textMaterials = new THREE.MeshPhongMaterial({
    color: 0xFF00FF,
    specular: 0xffffff, transparent: true, opacity: 1,
});

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
const scene: THREE.Scene = new THREE.Scene();
camera.position.z = 100;

let doubleLinkedList: DoubleLinkedList<number>;

const render = () => {
    renderer.render(scene, camera);
};

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.5;
controls.minDistance = 50;
controls.maxDistance = 6000;
controls.update();
controls.addEventListener('change', render);

const getHeight = (div: HTMLDivElement): number => {
    const divHeight = div.clientHeight;
    const minHeight = window.innerHeight / 4 * 2.4;
    return divHeight > minHeight ? divHeight : minHeight;
};

const resize = (div: HTMLDivElement): void => {
    resizeWithWidthAndHeight(div.clientWidth, getHeight(div));
};

const resizeWithWidthAndHeight = (width: number, height: number): void => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

function animate() {
    requestAnimationFrame(animate);
    controls.update();
}

const createItem = (font: THREE.Font, content: string, x: number, y: number, z: number, material: THREE.Material): void => {
    const planeGeometry = new THREE.PlaneGeometry(HASHMAP_ITEM_WIDTH, HASHMAP_ITEM_HEIGHT);
    const planeMesh = new THREE.Mesh(planeGeometry, material);
    planeMesh.position.set(x, y, z);
    scene.add(planeMesh);

    const contentGeometry = new THREE.TextGeometry(content, { font: font, ...TEXT_FONT });
    const contentMesh = new THREE.Mesh(contentGeometry, textMaterials);
    const contentX = x - 0.7;
    const contentY = y - 1;

    contentMesh.position.set(contentX, contentY, z);
    scene.add(contentMesh);
};

const createArrow = (source: THREE.Vector3, dest: THREE.Vector3, headLength: number, headWidth: number): void => {
    const direction = dest.clone().sub(source);
    const length = direction.length();
    const color = 0x0000ff;
    const arrowHelper = new THREE.ArrowHelper(direction, source, length, color, headLength, headWidth);
    scene.add(arrowHelper);
};

const createHashMap = (font: THREE.Font): void => {
    const startY = HASHMAP_POSITION.y;
    const startX = HASHMAP_POSITION.x;
    const z = HASHMAP_POSITION.z;

    for (let i = 0; i < HASHMAP_ROWS; i++) {
        const y = startY - i * (HASHMAP_ITEM_HEIGHT + 0.3);

        createItem(font, i + "", startX, y, z, hashMapMaterial);
        createArrow(new THREE.Vector3(startX + 3.3, y, z), new THREE.Vector3(startX + 10, y, z), 2, 1.5);

        for (let j = 0; j < HASHMAP_BUCKET_SIZE; j++) {
            const x = startX + 13.5 + j * (HASHMAP_ITEM_WIDTH + 0.06);
            createItem(font, j + "", x, y, z, hashMapMaterial);
        }
    }
};

export default () => {
    const ref = useRef<HTMLDivElement>(null);

    const loader = new THREE.FontLoader();

    loader.load('/fonts/Roboto_Regular.json', function (font) {

        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }

        // createHashMap(font);
        doubleLinkedList = new DoubleLinkedList(
            scene,
            8,
            new THREE.Vector3(-65, 20, 0),
            { color: "black", headLength: 3, headWidth: 1.5 },
            { color: "pink", width: 10, height: 6, textGeometryParameters: { font, size: 2, height: 0.02 }, textColor: 'rgb(250, 250, 0)' },
            render,
        );
        console.log(doubleLinkedList);

        renderer.render(scene, camera);
    });

    useEffect(() => {
        if (ref && ref.current && ref.current.children.length === 0) {
            renderer.render(scene, camera);
            resize(ref.current);
            ref.current.appendChild(renderer.domElement);
        }
    });

    let i = 0;
    const handleOnClient = () => {
        doubleLinkedList.insertFirst(i);
        console.log(doubleLinkedList);

        i++;
    };

    return (
        <div>
            <button onClick={handleOnClient}>increase</button>
            <div ref={ref} />
        </div>
    );

};
