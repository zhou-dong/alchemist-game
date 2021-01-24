import * as THREE from "three";
import BaseNode, { PlaneParameters, TextParameters } from "../commons/node";
import { BackwardArrow, ForwardArrow } from "./arrow";

export interface ArrowStyles {
    color: THREE.Color | string | number;
    headLength: number;
    headWidth: number;
}

export default class Node<T> extends BaseNode<T> {

    private _previous?: Node<T>;
    private _next?: Node<T>;

    private _forwardArrow?: ForwardArrow;
    private _backwardArrow?: BackwardArrow;

    arrowStyles: ArrowStyles;

    constructor(
        data: T,
        scene: THREE.Scene,
        planeParameters: PlaneParameters,
        textParameters: TextParameters,
        arrowStyles: ArrowStyles
    ) {
        super(data, scene, planeParameters, textParameters)
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

    append(node: Node<T>): void {
        node.previous = this;
        node.next = this.next;

        if (this.next) {
            this.next.previous = node;
        }
        this.next = node;
    }

    delete(): void {
        if (this.previous) {
            this.previous.next = this.next;
        }
        if (this.next) {
            this.next.previous = this.previous;
        }
        this.removeFromScene();
        this.removeArrowsFromScene();
        this.forwardArrow = undefined;
        this.backwardArrow = undefined;
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

    private removeArrowsFromScene(): void {
        if (this.forwardArrow) {
            this.scene.remove(this.forwardArrow);
        }
        if (this.backwardArrow) {
            this.scene.remove(this.backwardArrow);
        }
    }

    private set forwardArrow(arrow: ForwardArrow | undefined) {
        this._forwardArrow = arrow;
        if (this._forwardArrow) {
            this.scene.add(this._forwardArrow);
        }
    }

    private get forwardArrow() {
        return this._forwardArrow;
    }

    private set backwardArrow(arrow: BackwardArrow | undefined) {
        this._backwardArrow = arrow;
        if (this._backwardArrow) {
            this.scene.add(this._backwardArrow);
        }
    }

    private get backwardArrow() {
        return this._backwardArrow;
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
