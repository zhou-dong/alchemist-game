export const formula = `function postorder(node: Node) {
    if (node.left) {
        postorder(node.left);
    }
    if (node.right) {
        postorder(node.right);
    }
    print(node);
}

OR

function postorder(node: Node | null) {
    if (node == null) {
        return;
    }
    postorder(node.left);
    postorder(node.right);
    print(node);
}`;

export const description = `
For a binary tree, they are defined as access operations at each node, starting with the current node, then

Go down one level to Children:

- (L) Recursively traverse left subtree.
- (R) Recursively traverse right subtree.
- (N) Process the current node N itself.

Return by going up one level and arriving at the parent node.

---

Post-order (LRN)

1. Traverse the left subtree by recursively calling the post-order function.
2. Traverse the right subtree by recursively calling the post-order function.
3. Access the data part of the current node.

From Wikipedia.
`;

export const alUsecases = '';
export const example = '';
