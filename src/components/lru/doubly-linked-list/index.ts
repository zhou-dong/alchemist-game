import * as THREE from "three";
import gsap from "gsap";
import { PlaneParameters, TextParameters } from "../commons/node";
import Node, { ArrowStyles } from "./node";

export interface NodeParameters {
    width: number;
    height: number;
    color: THREE.Color | string | number;
    textGeometryParameters: THREE.TextGeometryParameters;
    textColor: THREE.Color | string | number;
}

export default class DoublyLinkedList<T> {

    private head: Node<T>;
    private tail: Node<T>;

    scene: THREE.Scene;
    margin: number;
    arrowStyles: ArrowStyles;
    nodeParameters: NodeParameters;

    private planeMaterial: THREE.Material;
    private textMaterial: THREE.Material;

    private render: Function;
    duration: number;

    constructor(
        scene: THREE.Scene,
        margin: number,
        start: THREE.Vector3,
        arrowStyles: ArrowStyles,
        nodeParameters: NodeParameters,
        render: Function,
        duration: number
    ) {
        this.render = render;
        this.duration = duration;

        this.scene = scene;
        this.margin = margin;
        this.arrowStyles = arrowStyles;
        this.nodeParameters = nodeParameters;

        this.planeMaterial = new THREE.MeshBasicMaterial({ color: this.nodeParameters.color, side: THREE.DoubleSide });
        this.textMaterial = new THREE.MeshPhongMaterial({ color: this.nodeParameters.textColor });

        this.head = this.createHead(start);
        this.tail = this.createEnd(start);

        this.head.next = this.tail;
        this.tail.previous = this.head;
    }

    insertFirst(data: T) {
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
            gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
            gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
        });

        const append = () => {
            const nextPosition = this.calculateNextPosistion(this.head.plane.position);
            const newNode = this.createNode(data, nextPosition);
            this.head.append(newNode);
            this.render();
        };

        return new Promise(resolve => {
            setTimeout(() => {
                append();
                resolve(0);
            }, this.duration * 1000)
        });
    }

    deleteLast() {
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
            gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
            gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
        });

        return new Promise(resolve => setTimeout(resolve, this.duration * 1000));
    }

    moveToHead() {

        const node: Node<T> | undefined = this.tail.previous;
        if (node && node !== this.head && node !== this.head.next) {
            const next = node.next;
            node.delete();
            if (!node.isInScene()) {
                node.addToScene();
            }
            this.render();

            const tempHeight = this.nodeParameters.height;

            const tempPlanePosition = this.calculateNextPosistion(this.head.plane.position);
            tempPlanePosition.setY(tempPlanePosition.y + tempHeight);
            const tempTextPosition = this.calculateNextPosistion(this.head.text.position);
            tempTextPosition.setY(tempTextPosition.y + tempHeight);

            gsap.to(node.plane.position, { ...tempPlanePosition, duration: this.duration, onUpdate: () => this.render() });
            gsap.to(node.text.position, { ...tempTextPosition, duration: this.duration });

            const tails = this.getHeads(node);
            tails.pop();
            tails.forEach(item => {
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
                gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
                gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
            });

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
                    gsap.to(node.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate, onComplete });
                    gsap.to(node.text.position, { ...nextTextPosition, duration: this.duration });

                }, this.duration * 1000);
            });

        }
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
        return x - this.nodeParameters.width - this.margin;
    }

    private calculateNextPosistion(position: THREE.Vector3): THREE.Vector3 {
        return position.clone().setX(this.calculateNextX(position.x));
    }

    private calculateNextX(x: number): number {
        return x + this.nodeParameters.width + this.margin;
    }

    private createHead(position: THREE.Vector3): Node<T> {
        const textPosition = new THREE.Vector3(position.x - 3.6, position.y - 1, position.z);

        const planeParameters: PlaneParameters = this.createPlaneParameters(position);
        const textParameters: TextParameters = this.createTextParameters(textPosition);
        return new Node("HEAD" as any, this.scene, planeParameters, textParameters, this.arrowStyles);
    }

    private createEnd(position: THREE.Vector3): Node<T> {
        const x = position.x + this.nodeParameters.width + this.margin;
        const nodePosition = position.clone().setX(x);
        const textPosition = new THREE.Vector3(x - 2.8, position.y - 1, position.z);

        const planeParameters: PlaneParameters = this.createPlaneParameters(nodePosition);
        const textParameters: TextParameters = this.createTextParameters(textPosition);
        return new Node("TAIL" as any, this.scene, planeParameters, textParameters, this.arrowStyles);
    }

    private createNode(
        data: T,
        nodePosition: THREE.Vector3,
        textPosition: THREE.Vector3 = new THREE.Vector3(nodePosition.x - 0.8, nodePosition.y - 1, nodePosition.z),
    ): Node<T> {
        const planeParameters: PlaneParameters = this.createPlaneParameters(nodePosition);
        const textParameters: TextParameters = this.createTextParameters(textPosition);
        return new Node(data, this.scene, planeParameters, textParameters, this.arrowStyles);
    }

    private createTextParameters(position: THREE.Vector3): TextParameters {
        const { textGeometryParameters } = this.nodeParameters;
        return { position, textGeometryParameters, material: this.textMaterial };
    }

    private createPlaneParameters(position: THREE.Vector3): PlaneParameters {
        const { width, height } = this.nodeParameters;
        return { width, height, position, material: this.planeMaterial };
    }
}
