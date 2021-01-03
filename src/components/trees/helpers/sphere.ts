import * as THREE from "three";

export default class Sphere extends THREE.Mesh {
    constructor(
        x: number,
        y: number,
        z: number,
        color?: THREE.Color | string | number,
        radius?: number,
        widthSegments?: number,
        heightSegments?: number,
    ) {
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        const material = new THREE.MeshBasicMaterial({ color: color, refractionRatio: 0.09, reflectivity: 0.3 });
        super(geometry, material);
        this.position.set(x, y, z);
    }
}

