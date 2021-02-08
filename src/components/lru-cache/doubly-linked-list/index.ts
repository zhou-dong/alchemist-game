import * as THREE from "three";
import gsap from "gsap";

import { PlaneParameters, TextParameters } from "../commons/node";
import { ArrowStyles, NodeStyles } from "../commons/styles";
import { createPlaneParameters, createTextParameters } from "../commons/helpers";
import Node from "./node";

export default class DoublyLinkedList<T> {

    private head: Node<T>;
    private tail: Node<T>;

    scene: THREE.Scene;
    margin: number;
    arrowStyles: ArrowStyles;
    nodeStyles: NodeStyles;

    private planeMaterial: THREE.Material;
    private textMaterial: THREE.Material;

    private render: Function;
    duration: number;

    constructor(
        scene: THREE.Scene,
        margin: number,
        start: THREE.Vector3,
        arrowStyles: ArrowStyles,
        nodeStyles: NodeStyles,
        render: Function,
        duration: number
    ) {
        this.render = render;
        this.duration = duration;

        this.scene = scene;
        this.margin = margin;
        this.arrowStyles = arrowStyles;
        this.nodeStyles = nodeStyles;

        this.planeMaterial = new THREE.MeshBasicMaterial({ color: this.nodeStyles.color, side: THREE.DoubleSide });
        this.textMaterial = new THREE.MeshBasicMaterial({ color: this.nodeStyles.textColor });

        this.head = this.createHead(start);
        this.tail = this.createEnd(start);

        this.head.next = this.tail;
        this.tail.previous = this.head;
    }

    async insertFirst(data: T, display: string, address: number, key: number): Promise<Node<T>> {
        this.getTails(this.head).forEach(item => {
            const onUpdate = () => {
                if (item.previous === this.head) {
                    this.head.update();
                }
                item.update();
                this.render();
            };

            const nextPlanePosition = this.calculateNextPosistion(item.plane.position);
            const nextTextPosition = this.calculateNextPosistion(item.text.position);
            const nextAddressPosition = this.calculateNextPosistion(item.address.position);

            gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
            gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
            gsap.to(item.address.position, { ...nextAddressPosition, duration: this.duration });
        });

        return new Promise(resolve => {
            setTimeout(() => {
                const nextPosition = this.calculateNextPosistion(this.head.plane.position);
                const newNode = this.createNode(key, data, display, address, nextPosition);
                this.head.append(newNode);
                this.render();
                resolve(newNode);
            }, this.duration * 1000)
        });
    }

    async deleteLast(): Promise<Node<T> | undefined> {
        const target = this.tail.previous;

        if (!target) {
            return;
        }
        if (target === this.head) {
            return;
        }

        target.delete();
        this.render();

        this.getTails(target).forEach(item => {
            const onUpdate = () => {
                if (item.previous) {
                    item.previous.update();
                }
                item.update();
                this.render();
            };
            const nextPlanePosition = this.calculatePreviousPosistion(item.plane.position);
            const nextTextPosition = this.calculatePreviousPosistion(item.text.position);
            const nextAddressPosition = this.calculatePreviousPosistion(item.address.position);
            gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
            gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
            gsap.to(item.address.position, { ...nextAddressPosition, duration: this.duration });
        });

        return new Promise(resolve => setTimeout(() => resolve(target), this.duration * 1000));
    }

    async moveToHead(node: Node<T>) {

        if (node === this.head || node === this.tail || node.previous === this.head) {
            return;
        }

        const next = node.next;
        const heads = this.getHeads(node);
        heads.pop(); // remove this.head from the head list

        node.delete();
        if (!node.isInScene()) {
            node.addToScene();
        }
        this.render();

        const tempHeight = this.nodeStyles.height;
        const tempPlanePosition = this.calculateNextPosistion(this.head.plane.position);
        tempPlanePosition.setY(tempPlanePosition.y + tempHeight);
        const tempTextPosition = this.calculateNextPosistion(this.head.text.position);
        tempTextPosition.setY(tempTextPosition.y + tempHeight);
        const nextAddressPosition = this.calculateNextPosistion(this.head.address.position);
        nextAddressPosition.setY(nextAddressPosition.y + tempHeight);

        // move node to the top of destination
        gsap.to(node.text.position, { ...tempTextPosition, duration: this.duration });
        gsap.to(node.address.position, { ...nextAddressPosition, duration: this.duration });
        gsap.to(node.plane.position, { ...tempPlanePosition, duration: this.duration, onUpdate: () => this.render() });

        // move previous nodes to back to give the space for the node.
        heads.forEach(item => {
            const onUpdate = () => {
                if (item.previous === this.head) {
                    this.head.update();
                }
                if (next && item.next === next) {
                    item.next.update();
                }
                item.update();
                this.render();
            };
            const nextPlanePosition = this.calculateNextPosistion(item.plane.position);
            const nextTextPosition = this.calculateNextPosistion(item.text.position);
            const nextAddressPosition = this.calculateNextPosistion(item.address.position);
            gsap.to(item.address.position, { ...nextAddressPosition, duration: this.duration });
            gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
            gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
        });

        // move node next to this.head
        return new Promise(resolve => {
            setTimeout(() => {
                this.head.append(node);
                this.render();

                const onUpdate = () => {
                    if (node.previous) {
                        node.previous.update();
                    }
                    if (node.next) {
                        node.next.update();
                    }
                    node.update();
                    this.render();
                };

                const onComplete = () => {
                    resolve(0);
                };

                const nextPlanePosition = this.calculateNextPosistion(this.head.plane.position);
                const nextTextPosition = this.calculateNextPosistion(this.head.text.position);
                const nextAddressPosition = this.calculateNextPosistion(this.head.address.position);
                gsap.to(node.address.position, { ...nextAddressPosition, duration: this.duration });
                gsap.to(node.text.position, { ...nextTextPosition, duration: this.duration });
                gsap.to(node.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate, onComplete });
            }, this.duration * 1000);
        });
    }

    private getTails(node: Node<any>): Node<any>[] {
        const result: Node<any>[] = [];
        let current = node.next;
        while (current) {
            result.push(current);
            current = current.next;
        }
        return result;
    }

    private getHeads(node: Node<T>): Node<any>[] {
        const result: Node<any>[] = [];
        let current = node.previous;
        while (current) {
            result.push(current);
            current = current.previous;
        }
        return result;
    }

    private calculatePreviousPosistion(position: THREE.Vector3): THREE.Vector3 {
        return position.clone().setX(this.calculatePreviousX(position.x));
    }

    private calculatePreviousX(x: number): number {
        return x - this.nodeStyles.width - this.margin;
    }

    private calculateNextPosistion(position: THREE.Vector3): THREE.Vector3 {
        return position.clone().setX(this.calculateNextX(position.x));
    }

    private calculateNextX(x: number): number {
        return x + this.nodeStyles.width + this.margin;
    }

    private createHead(position: THREE.Vector3): Node<T> {
        const textPosition = new THREE.Vector3(position.x - 3.6, position.y - 1, position.z);

        const planeParameters: PlaneParameters = this.createPlaneParameters(position);
        const textParameters: TextParameters = this.createTextParameters(textPosition);
        return new Node(-1, "HEAD" as any, "HEAD", 0, this.scene, planeParameters, textParameters, this.arrowStyles, this.nodeStyles.color);
    }

    private createEnd(position: THREE.Vector3): Node<T> {
        const x = position.x + this.nodeStyles.width + this.margin;
        const nodePosition = position.clone().setX(x);
        const textPosition = new THREE.Vector3(x - 2.8, position.y - 1, position.z);

        const planeParameters: PlaneParameters = this.createPlaneParameters(nodePosition);
        const textParameters: TextParameters = this.createTextParameters(textPosition);
        return new Node(-1, "TAIL" as any, "TAIL", 1, this.scene, planeParameters, textParameters, this.arrowStyles, this.nodeStyles.color);
    }

    private createNode(
        key: number,
        data: T,
        display: string,
        address: number,
        nodePosition: THREE.Vector3,
    ): Node<T> {
        const textPosition: THREE.Vector3 = new THREE.Vector3(this.calX(display, nodePosition.x), nodePosition.y - 1, nodePosition.z);
        const planeParameters: PlaneParameters = this.createPlaneParameters(nodePosition);
        const textParameters: TextParameters = this.createTextParameters(textPosition);
        return new Node(key, data, display, address, this.scene, planeParameters, textParameters, this.arrowStyles, this.nodeStyles.color);
    }

    private calX(display: string, x: number): number {
        switch (display.length) {
            case 1: return x - 0.8;
            case 2: return x - 1.4;
            default: return x - 2.5;
        }
    }

    private createTextParameters(position: THREE.Vector3): TextParameters {
        return createTextParameters(this.textMaterial, position, this.nodeStyles);
    }

    private createPlaneParameters(position: THREE.Vector3): PlaneParameters {
        return createPlaneParameters(this.planeMaterial, position, this.nodeStyles);
    }
}
