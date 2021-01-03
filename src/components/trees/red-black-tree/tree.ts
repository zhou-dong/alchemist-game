import Node, { Color } from "./node";

export default class Tree<T> {

    root?: Node<T>;

    constructor() {
        this.root = undefined;
    }

    public insert(val: T) {
        this.root = this.put(val, this.root);
        this.root.color = Color.Black;
    }

    private put(val: T, node?: Node<T>): Node<T> {
        if (node === undefined) {
            return new Node(val);
        }

        if (val < node.val) {
            node.left = this.put(val, node.left);
        } else {
            node.right = this.put(val, node.right);
        }

        if (
            node.right && node.right.isRed &&
            (node.left === undefined || node.left.isBlack)
        ) {
            node = this.rotateLeft(node);
        }

        if (
            node.left && node.left.isRed &&
            node.left.left && node.left.left.isRed
        ) {
            node = this.rotateRight(node);
        }

        if (
            node.left && node.left.isRed &&
            node.right && node.right.isRed
        ) {
            this.flipColors(node);
        }

        return node;
    }

    private rotateLeft(node: Node<T>): Node<T> {
        if (node.right === undefined) {
            throw new Error("can not find right child for rotateLeft");
        }

        if (node.right.color === Color.Black) {
            throw new Error("right child must be red for rotateLeft");
        }

        const x = node.right;
        node.right = x.left;
        x.left = node;
        x.color = node.color;
        node.color = Color.Red;
        return x;
    }

    private rotateRight(node: Node<T>): Node<T> {
        if (node.left === undefined) {
            throw new Error("can not find left child for rotateRight");
        }

        if (node.left.color === Color.Black) {
            throw new Error("left child must be red for rotateRight");
        }

        const x = node.left;
        node.left = x.right;
        x.right = node;
        x.color = node.color;
        node.color = Color.Red;
        return x;
    }

    private flipColors(node: Node<T>): void {
        if (node.right === undefined) {
            throw new Error("can not find right child for flipColors");
        }

        if (node.right.color === Color.Black) {
            throw new Error("right child must be red for flipColors");
        }

        if (node.left === undefined) {
            throw new Error("can not find left child for flipColors");
        }

        if (node.left.color === Color.Black) {
            throw new Error("left child must be red for flipColors");
        }

        if (node.color === Color.Red) {
            throw new Error("node must be black for flipColors");
        }

        node.color = Color.Red;
        node.left.color = Color.Black;
        node.right.color = Color.Black;
    }
}