import * as THREE from "three";
import BaseNode, { PlaneParameters, TextParameters } from "../commons/node";

export default class Node<T> extends BaseNode<T> {

    key: number;

    constructor(
        key: number,
        data: T,
        scene: THREE.Scene,
        planeParameters: PlaneParameters,
        textParameters: TextParameters,
    ) {
        super(data, scene, planeParameters, textParameters)
        this.key = key;
    }

    get leftConnectPosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x - width / 2, y, z);
    }

    get rightConnectPosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x + width / 2, y, z);
    }

    get nextPlanePosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x + width, y, z);
    }

    get previousPlanePosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x - width, y, z);
    }

    get nextTextPosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.text.position;
        return new THREE.Vector3(x + width, y, z);
    }

    get previousTextPosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.text.position;
        return new THREE.Vector3(x - width, y, z);
    }
}
