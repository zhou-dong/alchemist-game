export interface LinePosition {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export class NodePosition {

    cx: number;
    cy: number;
    r: number;

    constructor(cx: number, cy: number, r: number) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    get topX() {
        return this.cx;
    }

    get topY() {
        return this.cy - this.r;
    }

    get bottomX() {
        return this.cx;
    }

    get bottomY() {
        return this.cy + this.r;
    }

    get topLeftX() {
        return this.cx - this.r * Math.cos(Math.PI / 4);
    }

    get topLeftY() {
        return this.cy - this.r * Math.sin(Math.PI / 4);
    }

    get topRightX() {
        return this.cx + this.r * Math.cos(Math.PI / 4);
    }

    get topRightY() {
        return this.cy - this.r * Math.sin(Math.PI / 4);
    }

    get bottomLeftX() {
        return this.cx - this.r * Math.cos(Math.PI / 4);
    }

    get bottomLeftY() {
        return this.cy + this.r * Math.sin(Math.PI / 4);
    }

    get bottomRightX() {
        return this.cx + this.r * Math.cos(Math.PI / 4);
    }

    get bottomRightY() {
        return this.cy + this.r * Math.sin(Math.PI / 4);
    }
}

export const calculateLeftLinePosition = (node: NodePosition, left: NodePosition): LinePosition => ({
    x1: node.bottomLeftX,
    y1: node.bottomLeftY,
    x2: left.topX,
    y2: left.topY
});

export const calculateRightLinePosition = (node: NodePosition, right: NodePosition): LinePosition => ({
    x1: node.bottomRightX,
    y1: node.bottomRightY,
    x2: right.topX,
    y2: right.topY
});
