import * as THREE from "three";
import BaseNode, { PlaneParameters, TextParameters } from "../commons/node";
import { ArrowStyles } from "../commons/styles";
import { BackwardArrow, ForwardArrow } from "./arrow";
import { toMemoryAddress } from "../commons/helpers";

export default class Node<T> extends BaseNode<T> {

    private _previous?: Node<T>;
    private _next?: Node<T>;

    private _forwardArrow?: ForwardArrow;
    private _backwardArrow?: BackwardArrow;

    private arrowStyles: ArrowStyles;

    address: THREE.Mesh;
    readonly key: number;

    constructor(
        key: number,
        data: T,
        display: string,
        address: number,
        scene: THREE.Scene,
        planeParameters: PlaneParameters,
        textParameters: TextParameters,
        arrowStyles: ArrowStyles,
        addressColor: THREE.Color | string | number,
    ) {
        super(data, display, scene, planeParameters, textParameters)
        this.key = key;
        this.arrowStyles = arrowStyles;
        this.address = this.createAddress(address, textParameters, planeParameters, addressColor);
        scene.add(this.address);
    }

    private createAddress(
        address: number,
        { textGeometryParameters }: TextParameters,
        { height, position }: PlaneParameters,
        color: THREE.Color | string | number,
    ): THREE.Mesh {
        const text = toMemoryAddress(address);
        const material = new THREE.MeshBasicMaterial({ color });
        const addressGeometry = new THREE.TextGeometry(text, textGeometryParameters);
        const addressMesh = new THREE.Mesh(addressGeometry, material);
        const addressPostion = position.clone().set(position.x - 3, position.y - height, position.z);
        addressMesh.position.copy(addressPostion);
        return addressMesh;
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
        this.scene.remove(this.address);
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

    addToScene(): void {
        super.addToScene();
        if (this.address) {
            this.scene.add(this.address);
        }
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
