import * as THREE from "three";

import { PlaneParameters, TextParameters } from "../commons/node";

class HashMap {

    buckets: number;

    planeParameters: PlaneParameters;
    textParameters: TextParameters;

    constructor(

        buckets: number,

        planeParameters: PlaneParameters,
        textParameters: TextParameters,

    ) {

        this.buckets = buckets;


        this.planeParameters = planeParameters;
        this.textParameters = textParameters;
    }

}

const TEXT_FONT = { size: 2, height: 0.02 };

const HASHMAP_ITEM_WIDTH = 7;
const HASHMAP_ITEM_HEIGHT = 4;
const HASHMAP_ROWS = 5;
const HASHMAP_BUCKET_SIZE = 8;
const HASHMAP_POSITION = { x: -35, y: 15, z: 0 };

let scene: THREE.Scene;
const createBackgroundColor = () => `rgba(0, 127, 127)`;
const hashMapMaterial = new THREE.MeshBasicMaterial({ color: createBackgroundColor(), side: THREE.DoubleSide });
const textMaterials = new THREE.MeshPhongMaterial({
    color: 0xFF00FF,
    specular: 0xffffff, transparent: true, opacity: 1,
});


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
