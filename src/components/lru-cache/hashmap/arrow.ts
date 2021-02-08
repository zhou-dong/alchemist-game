import * as THREE from "three";
import Node from "./node";

function computeDirection(from: Node<any>, to: Node<any>): THREE.Vector3 {
    return to.leftConnectPosition.clone().sub(from.rightConnectPosition);
}

function getOrigin(from: Node<any>): THREE.Vector3 {
    return from.rightConnectPosition;
}

export default class Arrow extends THREE.ArrowHelper {

    private readonly headLength: number;
    private readonly headWidth: number;

    private _from: Node<any>;
    private _to: Node<any>;

    constructor(
        from: Node<any>,
        to: Node<any>,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        const direction = computeDirection(from, to);
        super(direction.clone().normalize(), getOrigin(from), direction.length(), color, headLength, headWidth)
        this.headLength = headLength;
        this.headWidth = headWidth;
        this._from = from;
        this._to = to;
    }

    public update(): void {
        const direction = this.direction;
        this.position.copy(this.origin);
        this.setDirection(direction.clone().normalize());
        this.setLength(direction.length(), this.headLength, this.headWidth);
    }

    set from(node: Node<any>) {
        this._from = node;
        this.update();
    }

    get from() {
        return this._from;
    }

    set to(node: Node<any>) {
        this._to = node;
        this.update();
    }

    get to() {
        return this._to;
    }

    private get origin(): THREE.Vector3 {
        return getOrigin(this.from);
    }

    private get direction(): THREE.Vector3 {
        return computeDirection(this.from, this.to);
    }
}
