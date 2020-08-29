export class Node {
    readonly index: number; // start from 1
    readonly level: number; // start from 0

    left?: Node;
    right?: Node;
    private _cx: number;

    constructor(index: number) {
        this.left = undefined;
        this.right = undefined;
        this.index = index;
        this.level = ~~Math.log2(index);
        this._cx = -1;
    }

    setLeft(): Node {
        this.left = new Node(2 * this.index);
        return this.left;
    }

    setRight(): Node {
        this.right = new Node(2 * this.index + 1);
        return this.right;
    }

    set cx(cx: number) {
        this._cx = cx;
    }

    get cx(): number {
        if (this.left && this.right) {
            return (this.left.cx + this.right.cx) / 2;
        }
        return this._cx;
    }
}

// Using Full_Binary_Tree to compute the cx of tree nodes.
class Calculator {
    public readonly nodes: Map<number, Node>;
    private readonly root: Node;
    private readonly treeDepth: number;
    private readonly width: number;

    constructor(depth: number, width: number) {
        this.treeDepth = depth;
        this.width = width;
        this.nodes = new Map();

        this.root = new Node(1);
        this.helper(this.root);
    }

    private helper(node: Node) {
        this.nodes.set(node.index, node);

        if (this.isLastLevel(node)) {
            this.setCXForNodeInLastRow(node);
            return;
        }

        this.helper(node.setLeft());
        this.helper(node.setRight());
    }

    private isLastLevel(node: Node): boolean {
        return node.level + 1 === this.treeDepth;
    }

    private setCXForNodeInLastRow(node: Node) {
        const countLastLevelNodes = Math.pow(2, node.level);
        const unit = this.width / (countLastLevelNodes + 1);
        node.cx = (node.index - countLastLevelNodes + 1) * unit;
    }
}

export default (depth: number, width: number): Map<number, Node> => {
    return new Calculator(depth, width).nodes;
};
