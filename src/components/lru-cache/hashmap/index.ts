import * as THREE from "three";

import { ArrowStyles, NodeStyles } from "../commons/styles";
import { createPlaneParameters, createTextParameters } from "../commons/helpers";
import Node from "./node";
import Arrow from "./arrow";
import Bucket from "./bucket";

export default class HashMap<T> {

    arrowStyles: ArrowStyles;
    nodeStyles: NodeStyles;

    private scene: THREE.Scene;
    public duration: number;

    private planeMaterial: THREE.Material;
    private textMaterial: THREE.Material;

    private indices: Node<number>[];
    private buckets: Bucket<T>[];

    private render: Function;
    constructor(
        scene: THREE.Scene,
        render: Function,
        start: THREE.Vector3,
        duration: number,
        buckets: number,

        arrowStyles: ArrowStyles,
        nodeStyles: NodeStyles,
    ) {
        this.scene = scene;
        this.render = render;
        this.duration = duration;
        this.arrowStyles = arrowStyles;
        this.nodeStyles = nodeStyles;

        this.planeMaterial = new THREE.MeshBasicMaterial({ color: nodeStyles.color, side: THREE.DoubleSide });
        this.textMaterial = new THREE.MeshBasicMaterial({ color: nodeStyles.textColor });

        this.indices = this.createIndices(scene, buckets, start, this.planeMaterial, this.textMaterial, nodeStyles);
        this.buckets = this.createBuckets(scene, render, start, duration, buckets, this.planeMaterial, this.textMaterial, nodeStyles);
    }

    private createBuckets(
        scene: THREE.Scene,
        render: Function,
        start: THREE.Vector3,
        duration: number,
        size: number,
        planeMaterial: THREE.Material,
        textMaterial: THREE.Material,
        nodeStyles: NodeStyles
    ): Bucket<T>[] {
        const { height, width } = nodeStyles;
        const buckets: Bucket<T>[] = [];
        for (let i = 0; i < size; i++) {
            const position = start.clone().setX(start.x + width * 2).setY(start.y - i * (height + 0.3));
            const bucket = new Bucket<T>(scene, planeMaterial, textMaterial, render, nodeStyles, position, duration);
            buckets.push(bucket);
        }
        return buckets;
    }

    private createIndices(
        scene: THREE.Scene,
        size: number,
        start: THREE.Vector3,
        planeMaterial: THREE.Material,
        textMaterial: THREE.Material,
        nodeStyles: NodeStyles
    ): Node<number>[] {
        const { height } = nodeStyles;
        const indices: Node<number>[] = [];

        for (let i = 0; i < size; i++) {
            const nodePlanePosition = start.clone().setY(start.y - i * (height + 0.3));
            const nodeTextPosition = start.clone().setY(start.y - 1 - i * (height + 0.3)).setX(start.x - 0.7);
            const planeParameters = createPlaneParameters(planeMaterial, nodePlanePosition, nodeStyles);
            const textParameters = createTextParameters(textMaterial, nodeTextPosition, nodeStyles);
            const display = i.toString();
            const node = new Node<number>(-1, i, display, scene, planeParameters, textParameters);
            indices.push(node);
        }

        return indices;
    }

    get(key: number): T | undefined {
        const bucket: Bucket<T> = this.getBucket(key);
        const node = bucket.findNode(key);
        return node && node.data;
    }

    push(key: number, data: T, display: string): void {
        const bucket: Bucket<T> = this.getBucket(key);
        bucket.append(key, data, display);
        if (bucket.length === 1) {
            const { color, headLength, headWidth } = this.arrowStyles;
            const indexNode = this.getIndex(key);
            const bucketNode = bucket.head;
            const arrow = new Arrow(indexNode, bucketNode, color, headLength, headWidth);
            bucketNode.arrow = arrow;
            this.scene.add(arrow);
        }
        this.render();
    }

    // TODO
    async delete(key: number): Promise<T | undefined> {
        const bucket = this.getBucket(key);
        console.log(bucket);
        bucket.delete(key);
        return;
    }

    private getIndex(key: number): Node<number> {
        const index = this.getBucketIndex(key);
        return this.indices[index];
    }

    private getBucket(key: number): Bucket<T> {
        const index = this.getBucketIndex(key);
        return this.buckets[index];
    }

    private getBucketIndex(key: number): number {
        return key % this.buckets.length;
    }
}
