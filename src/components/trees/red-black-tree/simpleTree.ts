import Node from "./node";
import Tree from "./tree";

export default class <T> extends Tree<T> {

    treeRoot: Node<T>

    constructor(input: T[]) {
        super();
        this.assertEmpty(input);
        this.buildTree(input);
        this.treeRoot = this.root!;
    }

    private buildTree(input: T[]) {
        input.forEach(item => this.insert(item));
    }

    private assertEmpty(input: T[]) {
        if (input.length === 0) {
            throw new Error("input can not be empty in simple black tree.");
        }
    }
}
