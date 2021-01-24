import * as THREE from "three";
import Node from "./node";
import { PlaneParameters, TextParameters } from "../commons/node";
import gsap from "gsap";

export default class Bucket<T> {

    private nodes: Node<T>[];

    private scene: THREE.Scene;
    private planeMaterial: THREE.Material;
    private textMaterial: THREE.Material;
    private textGeometryParameters: THREE.TextGeometryParameters;

    private render: Function;

    private start: THREE.Vector3;
    private width: number;
    private height: number;
    public duration: number;

    constructor(
        scene: THREE.Scene,
        planeMaterial: THREE.Material,
        textMaterial: THREE.Material,
        textGeometryParameters: THREE.TextGeometryParameters,
        render: Function,
        width: number,
        height: number,
        start: THREE.Vector3,
        duration: number,
    ) {
        this.nodes = [];
        this.scene = scene;
        this.planeMaterial = planeMaterial;
        this.textMaterial = textMaterial;
        this.textGeometryParameters = textGeometryParameters;
        this.render = render;
        this.start = start;
        this.width = width;
        this.height = height;
        this.duration = duration;
    }

    find(key: string | number): Node<T> | undefined {
        let result: Node<T> | undefined = undefined;
        this.nodes.forEach(node => {
            if (node.key === key) {
                result = node;
            }
        });
        return result;
    }

    append(key: number, data: T) {
        const last = this.last;
        if (last) {
            const node = new Node<T>(key, data, this.scene,
                this.createPlaneParameters(last.nextPlanePosition),
                this.createTextParameters(last.nextTextPosition)
            );
            this.nodes.push(node);
        } else {
            const { x, y, z } = this.start;
            const textPosition = new THREE.Vector3(x - 3.6, y - 1, z);
            const node = new Node<T>(key, data, this.scene,
                this.createPlaneParameters(this.start),
                this.createTextParameters(textPosition)
            );
            this.nodes.push(node);
        }
    }

    delete(key: number) {
        const node = this.find(key);

        if (node === undefined) {
            return;
        }

        const tails = this.getTails(node);
        this.deleteNode(node);

        tails.forEach(item => {
            const onUpdate = () => { this.render() };
            const nextPlanePosition = item.previousPlanePosition;
            const nextTextPosition = item.previousTextPosition;
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
        return {
            width: this.width,
            height: this.height,
            position,
            material: this.planeMaterial
        };
    }

    private createTextParameters(position: THREE.Vector3): TextParameters {
        return {
            position,
            textGeometryParameters: this.textGeometryParameters,
            material: this.textMaterial
        };
    }

    private get last(): Node<T> | undefined {
        return this.isEmpty ? undefined : this.nodes[this.length - 1];
    }

    private get length(): number {
        return this.nodes.length;
    }

    private get isEmpty(): boolean {
        return this.length === 0;
    }
}
