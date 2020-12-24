import React from "react";
import Node from "./node";

class Queue<T> {
    items: Node<T>[];

    constructor() {
        this.items = [];
    }

    public enqueue(item: Node<T>) {
        this.items.push(item);
    }

    public dequeue(): Node<T> | undefined {
        return this.items.shift();
    }

    public isEmpty() {
        return this.items.length === 0;
    }
}

function display<T>(node: Node<T>) {

    const queue = new Queue<T>();
    queue.enqueue(node);

    while (!queue.isEmpty()) {
        const size = queue.items.length;
        const arr: string[] = [];
        for (let i = 0; i < size; i++) {
            const curr = queue.dequeue();
            if (curr) {
                arr.push(curr.vals.join("-"));
                curr.children.forEach(item => {
                    queue.enqueue(item);
                });
            }
        }
        console.log("-----------")
        console.log(arr.join(","));
    }
}

const T = () => {
    let root = new Node<number>(1);
    for (let i = 2; i <= 10; i++) {
        root = root.insert(i);
    }
    console.log("xi ni");
    display(root);

    console.log(root);
    return (
        <>ddd1 </>
    );
};

export default T;
