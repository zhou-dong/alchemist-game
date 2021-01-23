import * as THREE from "three";
import Node from "./node";

abstract class Arrow extends THREE.ArrowHelper {

    private readonly headLength: number;
    private readonly headWidth: number;

    protected abstract _from: Node<any>;
    protected abstract _to: Node<any>;

    protected abstract get direction(): THREE.Vector3;
    protected abstract get origin(): THREE.Vector3;

    constructor(
        direction: THREE.Vector3,
        origin: THREE.Vector3,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        super(direction, origin, direction.length(), color, headLength, headWidth)
        this.headLength = headLength;
        this.headWidth = headWidth;
    }

    public update(): void {
        this.position.copy(this.origin);
        this.setDirection(this.direction.normalize());
        this.setLength(this.direction.length(), this.headLength, this.headWidth);
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
}

export class ForwardArrow extends Arrow {

    protected _from: Node<any>;
    protected _to: Node<any>;

    constructor(
        from: Node<any>,
        to: Node<any>,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        const origin: THREE.Vector3 = from.rightUpperConnectPosition;
        const dest: THREE.Vector3 = to.leftUpperConnectPosition;
        const direction = dest.clone().sub(origin);

        super(direction, origin, color, headLength, headWidth)

        this._from = from;
        this._to = to;
    }

    protected get origin(): THREE.Vector3 {
        return this.from.rightUpperConnectPosition;
    }

    protected get direction(): THREE.Vector3 {
        return this.to.leftUpperConnectPosition.clone().sub(this.from.rightUpperConnectPosition);
    }
}

export class BackwardArrow extends Arrow {

    protected _from: Node<any>;
    protected _to: Node<any>;

    constructor(
        from: Node<any>,
        to: Node<any>,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        const origin: THREE.Vector3 = from.leftLowerConnectPosition;
        const dest: THREE.Vector3 = to.rightLowerConnectPosition;
        const direction = dest.clone().sub(origin);

        super(direction, origin, color, headLength, headWidth)

        this._from = from;
        this._to = to;
    }

    protected get direction(): THREE.Vector3 {
        return this.to.rightLowerConnectPosition.clone().sub(this.from.leftLowerConnectPosition);

    }

    protected get origin(): THREE.Vector3 {
        return this.from.leftLowerConnectPosition;
    }
}
