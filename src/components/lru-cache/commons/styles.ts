import * as THREE from "three";

export interface ArrowStyles {
    color: THREE.Color | string | number;
    headLength: number;
    headWidth: number;
}

export interface NodeStyles {
    width: number;
    height: number;
    color: THREE.Color | string | number;
    textGeometryParameters: THREE.TextGeometryParameters;
    textColor: THREE.Color | string | number;
}
