import * as THREE from "three";
import gsap from "gsap";

import Node, { PlaneParameters, TextParameters, ArrowStyles } from "./node";

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

    render: Function;

    constructor(
        scene: THREE.Scene,
        margin: number,
        start: THREE.Vector3,
        arrowStyles: ArrowStyles,
        nodeParameters: NodeParameters,
        render: Function
    ) {
        this.render = render;

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

    insertFirst(data: T): void {

        this.tails.forEach((item, i) => {

            console.log(item.data);

            const nextPlanePosition = this.calculateNextPosistion(item.plane.position);
            const nextTextPosition = this.calculateNextPosistion(item.text.position);

            gsap.to(item.plane.position, {
                ...nextPlanePosition,
                duration: 3,
                onUpdate: () => {
                    if (item.previous == this.head) {
                        this.head.update();
                    }
                    item.update();
                    this.render();
                }
            });

            gsap.to(item.text.position, { ...nextTextPosition, duration: 3 });
        });

        setTimeout(() => {
            const nextPosition = this.calculateNextPosistion(this.head.plane.position);
            const newNode = this.createNode(data, nextPosition);
            this.head.append(newNode);
            this.render();
        }, 3000)

    }

    private get tails(): Node<any>[] {
        const result: Node<any>[] = [];
        let current = this.head.next;
        while (current) {
            result.push(current);
            current = current.next;
        }
        return result;
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
