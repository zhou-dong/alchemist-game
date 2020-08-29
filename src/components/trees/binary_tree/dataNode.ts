interface INode<T> {
    val: T;
    left?: INode<T>;
    right?: INode<T>;

    index: number; // index of this node in the tree. start from 1.
    readonly depth: number; // depths of this tree(node).
    readonly level: number; // level of this node in the tree. start from 0
    readonly size: number; // how many nodes of this tree.
}

const countNodes = <T>(root: INode<T>): number => {
    let result = 0;
    const helper = <T>(node?: INode<T>): void => {
        if (node === undefined) return;
        result++;

        helper(node.left);
        helper(node.right);
    }

    helper(root);
    return result;
};

const findDepth = <T>(root: INode<T>): number => {

    const helper = <T>(node: INode<T> | undefined, depth: number): number => {
        if (node === undefined) return depth;

        const left = helper(node.left, depth + 1);
        const right = helper(node.right, depth + 1);

        return Math.max(left, right);
    }

    return helper(root, 0);
};

export default class Node implements INode<string> {
    val: string;
    _left?: Node;
    _right?: Node;
    index: number;

    constructor(val: string, isRoot: boolean = false) {
        this.val = val;
        this._left = undefined;
        this._right = undefined;
        this.index = -1;
        if (isRoot) {
            this.index = 1;
        }
    }

    get left() {
        return this._left;
    }

    set left(node: Node | undefined) {
        this._left = node;
        if (this._left) {
            this._left.index = 2 * this.index;
        }
    }

    get right() {
        return this._right;
    }

    set right(node: Node | undefined) {
        this._right = node;
        if (this._right) {
            this._right.index = 2 * this.index + 1;
        }
    }

    get depth(): number {
        return findDepth(this);
    }

    get level(): number {
        return ~~Math.log2(this.index);
    }

    get size(): number {
        return countNodes(this);
    }
}
