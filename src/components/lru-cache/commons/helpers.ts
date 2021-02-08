import * as THREE from "three";
import { Material } from "three";
import { PlaneParameters, TextParameters } from "./node";
import { NodeStyles } from "./styles";

export function createPlaneParameters(
    material: Material,
    position: THREE.Vector3,
    { width, height }: NodeStyles,
): PlaneParameters {
    return { width, height, position, material };
}

export function createTextParameters(
    material: Material,
    position: THREE.Vector3,
    { textGeometryParameters }: NodeStyles,
): TextParameters {
    return { material, position, textGeometryParameters };
}

export function toMemoryAddress(address: number): string {
    const hex = address.toString(16).toUpperCase();
    return hex.length === 1 ? "0x0" + hex : "0x" + hex;
}
