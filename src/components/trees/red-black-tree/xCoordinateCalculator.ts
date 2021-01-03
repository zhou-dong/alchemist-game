class Node {
    readonly index: number; // start from 1
    readonly level: number; // start from 0

    left?: Node;
    right?: Node;
    x?: number;

    constructor(index: number) {
        this.left = undefined;
        this.right = undefined;
        this.index = index;
        this.level = ~~Math.log2(index);
    }

    setLeft(): Node {
        this.left = new Node(2 * this.index);
        return this.left;
    }

    setRight(): Node {
        this.right = new Node(2 * this.index + 1);
        return this.right;
    }

    setX(): void {
        if (this.left && this.right && this.left.x && this.right.x) {
            this.x = (this.left.x + this.right.x) / 2;
            return;
        }

        if (this.level === 0) {
            this.x = 0;
            return;
        }
        //  4        5      6     7
        // -2       -1      1      2 
        //  0        1      2      3
        // 123      456    789  10-11-12
        // -6-5-4 -3-2-1   123    456
        const lastLeveLNodes: number = Math.pow(2, this.level);
        const middle = lastLeveLNodes / 2;
        const rowIndex = this.index - lastLeveLNodes;

        if (rowIndex - middle < 0) {
            this.x = (rowIndex - middle) * 3 + 1;
        } else {
            this.x = (rowIndex - middle + 1) * 3 - 1;
        }
    }
}

// Using Full_Binary_Tree to compute the x coordinate of tree nodes.
class Calculator {
    // index -> x coordinate
    public readonly xCoordinatesMap: Map<number, number>;
    private readonly treeDepth: number;

    constructor(depth: number) {
        this.treeDepth = depth;
        this.xCoordinatesMap = new Map();

        const root = new Node(1);
        this.buildTree(root);
        this.setXCoordinates(root);
    }

    private buildTree(node: Node): void {
        if (this.isLastLevel(node)) return;

        this.buildTree(node.setLeft());
        this.buildTree(node.setRight());
    }

    private setXCoordinates(node: Node): void {
        if (node.left) {
            this.setXCoordinates(node.left);
        }
        if (node.right) {
            this.setXCoordinates(node.right);
        }
        node.setX();

        this.xCoordinatesMap.set(node.index, node.x!);
    }

    private isLastLevel(node: Node): boolean {
        return node.level + 1 === this.treeDepth;
    }
}

// index -> x coordinate
export default (depth: number): Map<number, number> => {
    return new Calculator(depth).xCoordinatesMap;
};
