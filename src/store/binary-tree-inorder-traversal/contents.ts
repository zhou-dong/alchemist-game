export const formula = `function inorder(node: Node) {
    if (node.left) {
        inorder(node.left);
    }
    print(node);
    if (node.right) {
        inorder(node.right);
    }
}

OR

function inorder(node: Node | null) {
    if (node == null) {
        return;
    }
    inorder(node.left);
    print(node);
    inorder(node.right);
}
`;

export const description = `
For a binary tree, they are defined as access operations at each node, starting with the current node, then

Go down one level to Children:

- (L) Recursively traverse left subtree.
- (R) Recursively traverse right subtree.
- (N) Process the current node N itself.

Return by going up one level and arriving at the parent node.

---

In-order (LNR)

1. Traverse the left subtree by recursively calling the in-order function.
2. Access the data part of the current node.
3. Traverse the right subtree by recursively calling the in-order function.

In a ***binary search tree*** ordered such that:

- In each node the key is greater than all keys in its left subtree and less than all keys in its right subtree;
- In-order traversal retrieves the keys in ascending sorted order.

`;
export const alUsecases = '';
export const example = '';
