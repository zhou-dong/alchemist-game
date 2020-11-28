interface Node<T> {
    vals: T[];
    children: Node<T>[];
    parent?: Node<T>;
}

export class DataNode<T> implements Node<T> {

    public vals: T[];
    public children: Node<T>[];

    constructor(val: T) {
        this.vals = [];
        this.children = [];
        this.vals.push(val);
    }
}

export class BehaviorNode<T> extends DataNode<T> {

    public parent?: BehaviorNode<T>;

    public get isLeaf(): boolean {
        return this.children.length === 0;
    }

    constructor(val: T) {
        super(val)
    }

    public insert(val: T): BehaviorNode<T> | undefined {

        if (this.vals.length >= 3) {
            throw new Error(`array length is:${this.vals.length} can't add more val`);
        }

        this.vals.push(val);
        this.vals.sort();

        if (this.isLeaf) {

            if (this.vals.length === 2) {
                return this;
            }

            if (this.vals.length === 3) {
                const left = new BehaviorNode(this.vals[0]);
                const right = new BehaviorNode(this.vals[2])
                if (this.parent === undefined) {
                    this.parent = new BehaviorNode<T>(this.vals[1]);
                    this.parent.children.push(left);
                    this.parent.children.push(right);
                } else {
                    this.parent.children.push(left);
                    this.parent.children.push(right);
                    this.parent.insert(this.vals[1]);
                }
                return this.parent!;
            }

        } else {

        }


        return undefined;
    }
}
