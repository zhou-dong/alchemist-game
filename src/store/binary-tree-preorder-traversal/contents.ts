export const formula = `function preorder(node: Node) {
    print(node);
    if (node.left) {
        preorder(node.left);
    }
    if (node.right) {
        preorder(node.right);
    }
}

OR

function preorder(node: Node | null) {
    if (node == null) {
        return;
    }
    print(node);
    preorder(node.left);
    preorder(node.right);
}`;

export const description = `
For a binary tree, they are defined as access operations at each node, starting with the current node, then

Go down one level to Children:

- (L) Recursively traverse left subtree.
- (R) Recursively traverse right subtree.
- (N) Process the current node N itself.

Return by going up one level and arriving at the parent node.

---

Pre-order (NLR)

1. Access the data part of the current node.
2. Traverse the left subtree by recursively calling the pre-order function.
3. Traverse the right subtree by recursively calling the pre-order function.

The pre-order traversal is a topologically sorted one, because a parent node is processed before any of its child nodes is done.

From Wikipedia.
`;

export const alUsecases = '';
export const example = '';
