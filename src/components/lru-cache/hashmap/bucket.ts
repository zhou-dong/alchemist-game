import * as THREE from "three";
import gsap from "gsap";

import Node from "./node";
import { PlaneParameters, TextParameters } from "../commons/node";
import { createPlaneParameters, createTextParameters } from "../commons/helpers";
import { NodeStyles } from "../commons/styles";

export default class Bucket<T> {

    private nodes: Node<T>[];
    private scene: THREE.Scene;
    private planeMaterial: THREE.Material;
    private textMaterial: THREE.Material;
    private render: Function;
    private nodeStyles: NodeStyles;
    private start: THREE.Vector3;
    public duration: number;

    constructor(
        scene: THREE.Scene,
        planeMaterial: THREE.Material,
        textMaterial: THREE.Material,
        render: Function,
        nodeStyles: NodeStyles,
        start: THREE.Vector3,
        duration: number,
    ) {
        this.nodes = [];
        this.scene = scene;
        this.planeMaterial = planeMaterial;
        this.textMaterial = textMaterial;
        this.render = render;
        this.nodeStyles = nodeStyles;
        this.start = start;
        this.duration = duration;
    }

    get head(): Node<T> {
        return this.nodes[0];
    }

    findNode(key: number): Node<T> | undefined {
        let result: Node<T> | undefined = undefined;

        this.nodes.forEach(node => {
            if (node.key === key) {
                result = node;
            }
        });
        return result;
    }

    append(key: number, data: T, display: string): Node<T> {
        const last = this.last;
        if (last) {
            const node = new Node<T>(key, data, display, this.scene,
                this.createPlaneParameters(last.nextPlanePosition),
                this.createTextParameters(last.nextTextPosition)
            );
            this.nodes.push(node);
            return node;
        } else {
            const { x, y, z } = this.start;
            const textPosition = new THREE.Vector3(x - 3, y - 1, z);
            const node = new Node<T>(key, data, display, this.scene,
                this.createPlaneParameters(this.start),
                this.createTextParameters(textPosition)
            );
            this.nodes.push(node);
            return node;
        }
    }

    async delete(key: number): Promise<T | undefined> {
        const node = this.findNode(key);

        if (node === undefined) {
            return;
        }

        const tails = this.getTails(node);
        this.deleteNode(node);

        tails.forEach(item => {
            const onUpdate = () => { this.render() };
            const nextPlanePosition = item.previousPlanePosition;
            const nextTextPosition = item.previousTextPosition;
            const nextIndexPosition = item.previousIndexPosition;
            gsap.to(item.index.position, { ...nextIndexPosition, duration: this.duration });
            gsap.to(item.plane.position, { ...nextPlanePosition, duration: this.duration, onUpdate });
            gsap.to(item.text.position, { ...nextTextPosition, duration: this.duration });
        });

        return new Promise(resolve => setTimeout(resolve, this.duration * 1000));
    }

    private deleteNode(node: Node<T>): void {
        node.removeFromScene();
        const index = this.nodes.indexOf(node);
        delete this.nodes[index];
    }

    private getTails(node: Node<T>): Node<T>[] {
        const index = this.nodes.indexOf(node);
        return this.nodes.slice(index, this.nodes.length);
    }

    private createPlaneParameters(position: THREE.Vector3): PlaneParameters {
        return createPlaneParameters(this.planeMaterial, position, this.nodeStyles);
    }

    private createTextParameters(position: THREE.Vector3): TextParameters {
        return createTextParameters(this.textMaterial, position, this.nodeStyles);
    }

    private get last(): Node<T> | undefined {
        return this.isEmpty ? undefined : this.nodes[this.length - 1];
    }

    get length(): number {
        return this.nodes.length;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }
}
