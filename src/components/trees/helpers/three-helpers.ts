import * as THREE from "three";

export const init = (width: number, height: number) => {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 22;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    return { renderer, camera };
};

export const getContentCoordinates = (content: string) => {
    switch (content.length) {
        case 1: return { x: -0.2, y: 0.7 };
        case 2: return { x: -0.25, y: 0.7 };
        case 3: return { x: -0.35, y: 0.7 };
        default: return { x: -0.5, y: 0.7 };
    }
};

export const clearScene = (scene: THREE.Scene): void => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
};

export const getWidth = () => {
    return window.innerWidth / 2;
};

export const getHeight = () => {
    return window.innerHeight / 5 * 4;
};

export const createPlane = (): THREE.Mesh => {
    const planeGeometry = new THREE.PlaneGeometry(getWidth() / 2, getHeight() / 2, 64, 48);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: "black",
        transparent: true,
        opacity: 0.1,
        wireframe: true,
        side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.x = 1;
    plane.position.y = -15;
    plane.rotateX(- Math.PI / 2);

    return plane;
};

export const createLight = (): THREE.Light => {
    return new THREE.SpotLight("black", 2);
};

export const resize = (renderer: THREE.Renderer, camera: THREE.PerspectiveCamera): void => {
    const width = getWidth();
    const height = getHeight();

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
};

export const textFont = { size: 0.5, height: 0.02, };
