export enum Color {
    Red = "red", Black = "black"
}

export default class Node<T> {

    val: T;
    left?: Node<T>;
    right?: Node<T>;
    color: Color;

    constructor(val: T) {
        this.val = val;
        this.left = undefined;
        this.right = undefined;
        this.color = Color.Red;
    }

    get isRed(): boolean {
        return this.color === Color.Red;
    }

    get isBlack(): boolean {
        return this.color === Color.Black;
    }
}
