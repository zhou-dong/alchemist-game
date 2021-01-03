import React from "react";
import * as THREE from "three";
import Node from "./node";
import Decorator from "./Decorator";
import { clearScene } from "../helpers/three-helpers";
interface Props<T> {
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    plane: THREE.Mesh;
    light: THREE.Light;
    input: T[];
    radius: number;
    marginY: number;
    startY: number;
}

function buildTree<T>(input: T[]) {
    let root = new Node<T>(input[0]);
    for (let i = 1; i < input.length; i++) {
        root = root.insert(input[i]);
    }
    return root;
}

export default <T extends unknown>(props: Props<T>) => {
    clearScene(props.scene);
    return props.input.length === 0 ? <></> : <Decorator {...props} root={buildTree(props.input)} z={1} />;
};
