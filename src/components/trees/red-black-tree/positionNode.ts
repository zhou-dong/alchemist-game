import Node, { Color } from "./node";

export default class PositionNode<T> extends Node<T> {
    index: number;
    x: number;
    y: number;
    z: number;

    left?: PositionNode<T>;
    right?: PositionNode<T>;

    constructor(val: T, index: number, x: number, y: number, z: number, color: Color) {
        super(val);
        this.index = index;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
    }
}