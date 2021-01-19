import * as THREE from "three";
import { BackwardArrow, ForwardArrow } from "./arrow";

export interface ArrowStyles {
    color: THREE.Color | string | number;
    headLength: number;
    headWidth: number;
}

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

    private _previous?: Node<T>;
    private _next?: Node<T>;

    private _forwardArrow?: ForwardArrow;
    private _backwardArrow?: BackwardArrow;

    scene: THREE.Scene;

    plane: THREE.Mesh;
    planeGeometry: THREE.PlaneGeometry;

    text: THREE.Mesh;
    textGeometry: THREE.TextGeometry;

    arrowStyles: ArrowStyles;

    constructor(
        data: T,
        scene: THREE.Scene,
        planeParameters: PlaneParameters,
        textParameters: TextParameters,
        arrowStyles: ArrowStyles
    ) {
        this.data = data;
        this.scene = scene;

        this.planeGeometry = new THREE.PlaneGeometry(planeParameters.width, planeParameters.height);
        this.plane = new THREE.Mesh(this.planeGeometry, planeParameters.material);
        this.plane.position.copy(planeParameters.position);

        this.textGeometry = new THREE.TextGeometry(data + "", textParameters.textGeometryParameters);
        this.text = new THREE.Mesh(this.textGeometry, textParameters.material);
        this.text.position.copy(textParameters.position);

        this.scene.add(this.plane);
        this.scene.add(this.text);

        this.arrowStyles = arrowStyles;
    }

    set previous(node: Node<T> | undefined) {
        if (node) {
            if (this.backwardArrow) {
                this.backwardArrow.from = this;
                this.backwardArrow.to = node;
            } else {
                const { color, headLength, headWidth } = this.arrowStyles;
                this.backwardArrow = new BackwardArrow(this, node, color, headLength, headWidth);
            }
        }
        this._previous = node;
    }

    get previous() {
        return this._previous;
    }

    set next(node: Node<T> | undefined) {
        if (node) {
            if (this.forwardArrow) {
                this.forwardArrow.from = this;
                this.forwardArrow.to = node;
            } else {
                const { color, headLength, headWidth } = this.arrowStyles;
                this.forwardArrow = new ForwardArrow(this, node, color, headLength, headWidth);
            }
        }
        this._next = node;
    }

    get next() {
        return this._next;
    }

    set forwardArrow(arrow: ForwardArrow | undefined) {
        this._forwardArrow = arrow;
        if (this._forwardArrow) {
            this.scene.add(this._forwardArrow);
        }
    }

    get forwardArrow() {
        return this._forwardArrow;
    }

    set backwardArrow(arrow: BackwardArrow | undefined) {
        this._backwardArrow = arrow;
        if (this._backwardArrow) {
            this.scene.add(this._backwardArrow);
        }
    }

    get backwardArrow() {
        return this._backwardArrow;
    }

    append(node: Node<T>): void {
        node.previous = this;
        node.next = this.next;

        if (this.next) {
            this.next.previous = node;
        }
        this.next = node;
    }

    update(): void {
        this.updateBackwardArrow();
        this.updateForwardArrow();
    }

    prepend(node: Node<T>): void {
        node.next = this;
        node.previous = this.previous;

        if (this.previous) {
            this.previous.next = node;
        }
        this.previous = node;
    }

    private updateBackwardArrow(): void {
        if (this.backwardArrow) {
            this.backwardArrow.update();
        }
    }

    private updateForwardArrow(): void {
        if (this.forwardArrow) {
            this.forwardArrow.update();
        }
    }

    get leftUpperConnectPosition(): THREE.Vector3 {
        const { width, height } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x - width / 2, y + height / 5, z);
    }

    get leftLowerConnectPosition(): THREE.Vector3 {
        const { width, height } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x - width / 2, y - height / 5, z);
    }

    get rightUpperConnectPosition(): THREE.Vector3 {
        const { width, height } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x + width / 2, y + height / 5, z);
    }

    get rightLowerConnectPosition(): THREE.Vector3 {
        const { width, height } = this.planeGeometry.parameters;
        const { x, y, z } = this.plane.position;
        return new THREE.Vector3(x + width / 2, y - height / 5, z);
    }
}
