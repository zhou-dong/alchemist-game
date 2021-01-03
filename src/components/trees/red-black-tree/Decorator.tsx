import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Node from "./node";
import PositionNode from "./positionNode";
import xCoordinatesCalculator from "./xCoordinateCalculator";
import { clearScene, getContentCoordinates, resize, textFont } from "../helpers/three-helpers";
import Sphere from "../helpers/sphere";

interface Props<T> {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    plane: THREE.Mesh;
    light: THREE.Light;
    root: Node<T>;
    marginY: number;
    startY: number;
    z: number;
    radius: number;
}

function countTreeDepths<T>(root: Node<T>): number {

    const helper = (depth: number, node?: Node<T>): number => {
        if (!node) return depth;
        const left = helper(depth + 1, node.left);
        const right = helper(depth + 1, node.right);
        return Math.max(left, right);
    }
    return helper(0, root);
}

function createPositionNode<T>(root: Node<T>, marginY: number, startY: number, z: number): PositionNode<T> {
    const treeDepths = countTreeDepths(root);
    const xCoordinates: Map<number, number> = xCoordinatesCalculator(treeDepths);

    const helper = (node: Node<T>, index: number, y: number, z: number): PositionNode<T> => {
        const x: number = xCoordinates.get(index)!;
        const newNode: PositionNode<T> = new PositionNode(node.val, index, x, y, z, node.color);

        if (node.left) {
            const leftIndex = 2 * index;
            newNode.left = helper(node.left, leftIndex, y - marginY, z);
        }
        if (node.right) {
            const rightIndex = 2 * index + 1
            newNode.right = helper(node.right, rightIndex, y - marginY, z);
        }
        return newNode;
    };

    return helper(root, 1, startY, z);
}

class SimpleSphere<T> extends Sphere {
    constructor(node: PositionNode<T>, radius: number) {
        super(node.x, node.y, node.z, node.color, radius, 30, 30);
    }
}

function loadSpheres<T>(root: PositionNode<T>, radius: number, renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {

    const helper = (node: PositionNode<T>): void => {
        scene.add(new SimpleSphere(node, radius));
        if (node.left) {
            helper(node.left);
        }
        if (node.right) {
            helper(node.right);
        }
    };

    helper(root);

    renderer.render(scene, camera);
}

const redLineMaterial = new THREE.LineBasicMaterial({ color: "red" });
const blackLineMaterial = new THREE.LineBasicMaterial({ color: "grey" });
function loadLines<T>(root: PositionNode<T>, renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {

    function helper<T>(node: PositionNode<T>) {
        const start = new THREE.Vector3(node.x, node.y, node.z);
        if (node.left) {
            const points = [start];
            const end = new THREE.Vector3(node.left.x, node.left.y, node.left.z);
            points.push(end);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            if (node.left.isRed) {
                scene.add(new THREE.Line(geometry, redLineMaterial));
            } else {
                scene.add(new THREE.Line(geometry, blackLineMaterial));
            }
        }
        if (node.right) {
            const points = [start];
            const end = new THREE.Vector3(node.right.x, node.right.y, node.right.z);
            points.push(end);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            if (node.right.isRed) {
                scene.add(new THREE.Line(geometry, redLineMaterial));
            } else {
                scene.add(new THREE.Line(geometry, blackLineMaterial));
            }
        }
        if (node.left) {
            helper(node.left);
        }

        if (node.right) {
            helper(node.right);
        }
    }

    helper(root);
    renderer.render(scene, camera);
}

const textMaterials = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 1, });// front
function loadTexts<T>(root: PositionNode<T>, renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {

    function helper<T>(node: PositionNode<T>, font: THREE.Font) {

        const content = node.val + "";
        const geometry = new THREE.TextGeometry(content, { font: font, size: textFont.size, height: textFont.height, });
        const mesh = new THREE.Mesh(geometry, textMaterials);
        const { x, y } = getContentCoordinates(content);
        mesh.position.set(node.x + x, node.y + y, node.z);
        scene.add(mesh);

        if (node.left) {
            helper(node.left, font);
        }
        if (node.right) {
            helper(node.right, font);
        }
    }

    const loader = new THREE.FontLoader();
    loader.load('/fonts/Roboto_Regular.json', function (font) {
        helper(root, font);
        renderer.render(scene, camera);
    });
}

export default <T extends unknown>({ root, marginY, scene, renderer, camera, startY, z, radius, plane, light }: Props<T>) => {

    clearScene(scene);
    scene.add(plane);
    scene.add(light);

    const positionRoot = createPositionNode(root, marginY, startY, z);
    loadSpheres(positionRoot, radius, renderer, camera, scene);
    loadLines(positionRoot, renderer, camera, scene);
    loadTexts(positionRoot, renderer, camera, scene);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref && ref.current) {
            if (ref.current.children.length === 0) {
                ref.current.appendChild(renderer.domElement);
            }
        }
    }, [ref, renderer.domElement]);

    window.addEventListener('resize', () => resize(renderer, camera), false);

    return <div ref={ref} />;
};
