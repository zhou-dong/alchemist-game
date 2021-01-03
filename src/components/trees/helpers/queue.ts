export default class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    public enqueue(item: T) {
        this.items.push(item);
    }

    public dequeue(): T | undefined {
        return this.items.shift();
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    public get size(): number {
        return this.items.length;
    }
}
