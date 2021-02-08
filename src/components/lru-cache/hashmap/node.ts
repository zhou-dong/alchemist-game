import * as THREE from "three";
import { TextGeometryParameters } from "three";
import BaseNode, { PlaneParameters, TextParameters } from "../commons/node";
import Arrow from "./arrow";

export default class Node<T> extends BaseNode<T> {

    key: number;
    arrow?: Arrow;

    private indexGeometry: THREE.TextGeometry
    index: THREE.Mesh;

    constructor(
        key: number,
        data: T,
        display: string,
        scene: THREE.Scene,
        planeParameters: PlaneParameters,
        textParameters: TextParameters,
    ) {
        super(data, display, scene, planeParameters, textParameters)
        this.key = key;

        const { x, y, z } = planeParameters.position;
        const { width, height } = planeParameters;
        const indexGeometryParameters: TextGeometryParameters = { ...textParameters.textGeometryParameters, size: 1.2 }

        this.indexGeometry = new THREE.TextGeometry(key + "", indexGeometryParameters);
        this.index = new THREE.Mesh(this.indexGeometry, textParameters.material);
        this.index.position
            .setX(x - width / 2 + 0.3)
            .setY(y + height / 2 - 1.5)
            .setZ(z);

        if (key > 0) {
            scene.add(this.index);
        }
    }

    removeFromScene() {
        super.removeFromScene();
        this.scene.remove(this.index);
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

    get nextIndexPosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.index.position;
        return new THREE.Vector3(x + width, y, z);
    }

    get previousIndexPosition(): THREE.Vector3 {
        const { width } = this.planeGeometry.parameters;
        const { x, y, z } = this.index.position;
        return new THREE.Vector3(x - width, y, z);
    }
}
