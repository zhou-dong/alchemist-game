import * as THREE from "three";

export interface PlaneParameters {
    width: number;
    height: number;
    position: THREE.Vector3;
    material: THREE.Material;
}

export interface TextParameters {
    position: THREE.Vector3;
    textGeometryParameters: THREE.TextGeometryParameters;
    material: THREE.Material;
}

export default class Node<T> {

    data: T;
    display: string;
    scene: THREE.Scene;

    plane: THREE.Mesh;
    protected planeGeometry: THREE.PlaneGeometry;

    text: THREE.Mesh;
    private textGeometry: THREE.TextGeometry;

    constructor(
        data: T,
        display: string,
        scene: THREE.Scene,
        planeParameters: PlaneParameters,
        textParameters: TextParameters
    ) {
        this.data = data;
        this.display = display;
        this.scene = scene;

        this.planeGeometry = new THREE.PlaneGeometry(planeParameters.width, planeParameters.height);
        this.plane = new THREE.Mesh(this.planeGeometry, planeParameters.material);
        this.plane.position.copy(planeParameters.position);

        this.textGeometry = new THREE.TextGeometry(display, textParameters.textGeometryParameters);
        this.text = new THREE.Mesh(this.textGeometry, textParameters.material);
        this.text.position.copy(textParameters.position);

        this.addToScene();
    }

    addToScene(): void {
        this.scene.add(this.plane);
        this.scene.add(this.text);
    }

    isInScene(): boolean {
        return this.scene.children.indexOf(this.plane) > -1 || this.scene.children.indexOf(this.text) > -1
    }

    removeFromScene(): void {
        this.scene.remove(this.plane);
        this.scene.remove(this.text);
    }
}
