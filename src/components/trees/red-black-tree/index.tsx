import React from "react";
import * as THREE from "three";
import Decorator from "./Decorator";
import RedBlackTree from "./simpleTree";
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
    startY: number
}

export default <T extends unknown>(props: Props<T>) => {
    clearScene(props.scene);
    return props.input.length === 0 ? <></> : <Decorator {...props} root={new RedBlackTree<T>(props.input).treeRoot} z={1} />;
}
