import { uuidv4 } from "./uuid";

export default class Node<T> {

    x?: number;
    y?: number;
    z?: number;

    private populateCoordinates(startY: number, marginY: number, z: number): void {
        this.z = z;
        if (this.isLeaf) {
            this.y = startY;
            return;
        }

        const child: Node<T> = this.children[0];
        if (child && child.y) {
            this.y = child.y + marginY;
        }

        if (this.minChild.x !== undefined && this.maxChild.x !== undefined) {
            this.x = (this.minChild.x + this.maxChild.x) / 2
        }
    }

    populateTreeCoordinates(startY: number, marginY: number, z: number): void {
        this.children.forEach(item => {
            item.populateTreeCoordinates(startY, marginY, z);
            item.populateCoordinates(startY, marginY, z);
        });
        this.populateCoordinates(startY, marginY, z);
    }

    private id: string;
    vals: T[];
    children: Node<T>[];
    parent?: Node<T>;

    private removeChild(childId: string) {
        this.children = this.children.filter(child => child.id !== childId);
    }

    constructor(val: T) {
        this.id = uuidv4();
        this.vals = [];
        this.children = [];
        this.vals.push(val);
    }

    private sortVals() {
        this.vals.sort((a, b) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    private get isLeaf(): boolean {
        return this.children.length === 0;
    }

    public insert(val: T): Node<T> {

        if (this.isLeaf) {

            this.vals.push(val);
            this.sortVals();

            switch (this.vals.length) {
                case 2:
                    if (this.parent) {
                        return this.parent.insertFromChild();
                    } else {
                        return this;
                    }
                case 3:
                    const left = new Node(this.vals[0]);
                    const right = new Node(this.vals[2]);
                    if (this.parent) {

                        this.parent.removeChild(this.id);
                        this.parent.children.push(left);
                        this.parent.children.push(right);
                        left.parent = this.parent;
                        right.parent = this.parent;

                        this.parent.sortChildren();
                        return this.parent.insertFromChild(this.vals[1]);
                    } else {
                        const parent = new Node<T>(this.vals[1]);
                        left.parent = parent;
                        right.parent = parent;
                        parent.children.push(left);
                        parent.children.push(right);

                        parent.sortChildren();
                        return parent;
                    }
                default: throw new Error(`insert errors inLeaf with wrong size of vals: ${this.vals.length}`);
            }
        } else {
            switch (this.vals.length) {
                case 1:
                    if (val < this.vals[0]) {
                        return this.minChild.insert(val);
                    } else {
                        return this.maxChild.insert(val);
                    }
                case 2:
                    if (val < this.vals[0]) {
                        return this.minChild.insert(val);
                    } else if (val > this.vals[1]) {
                        return this.maxChild.insert(val);
                    } else {
                        return this.midChild.insert(val);
                    }
                default: throw new Error(`insert errors nonLeft with wrong size of vals: ${this.vals.length}`);
            }
        }
    }

    private insertFromChild(val?: T): Node<T> {

        if (this.parent) {
            if (val) {

                switch (this.vals.length) {
                    case 1:
                        this.vals.push(val);
                        this.sortVals();

                        return this.parent.insertFromChild();
                    case 2:
                        this.vals.push(val);
                        this.sortVals();

                        const left_temp = new Node(this.vals[0]);

                        left_temp.children.push(this.children[0]);
                        left_temp.children.push(this.children[1]);
                        this.children[0].parent = left_temp;
                        this.children[1].parent = left_temp;
                        left_temp.parent = this.parent;
                        this.parent.children.push(left_temp);

                        const right_temp = new Node(this.vals[2]);
                        right_temp.children.push(this.children[2]);
                        right_temp.children.push(this.children[3]);
                        this.children[2].parent = right_temp;
                        this.children[3].parent = right_temp;
                        this.parent.children.push(right_temp);
                        right_temp.parent = this.parent;

                        this.parent.removeChild(this.id);
                        this.parent.sortChildren();
                        return this.parent.insertFromChild(this.vals[1]);
                    default: throw new Error("node vals lenght unexpected in insertFromChild");
                }
            } else {
                return this.parent.insertFromChild();
            }
        } else {
            if (val) {
                switch (this.vals.length) {
                    case 1:
                        this.vals.push(val);
                        this.sortVals();

                        return this;
                    case 2:
                        this.vals.push(val);
                        this.sortVals();

                        const root = new Node<T>(this.vals[1]);

                        const left_temp = new Node(this.vals[0]);
                        left_temp.children.push(this.children[0]);
                        left_temp.children.push(this.children[1]);
                        this.children[0].parent = left_temp;
                        this.children[1].parent = left_temp;
                        root.children.push(left_temp);
                        left_temp.parent = root;

                        const right_temp = new Node(this.vals[2]);
                        right_temp.children.push(this.children[2]);
                        right_temp.children.push(this.children[3]);
                        this.children[2].parent = right_temp;
                        this.children[3].parent = right_temp;
                        root.children.push(right_temp);
                        right_temp.parent = root;

                        root.sortChildren();
                        return root;
                    default: throw new Error("node vals lenght unexpected in insertFromChild");
                }
            } else {
                return this;
            }
        }
    }

    private sortChildren() {
        this.children.sort((a, b) => {
            if (a.vals[0] < b.vals[0]) {
                return -1;
            } else if (a.vals[0] > b.vals[0]) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    private get minChild(): Node<T> {
        this.sortChildren();
        return this.children[0];
    }

    private get maxChild(): Node<T> {
        this.sortChildren();
        return this.children[this.children.length - 1];
    }

    private get midChild(): Node<T> {
        this.sortChildren();
        return this.children[1];
    }
}
