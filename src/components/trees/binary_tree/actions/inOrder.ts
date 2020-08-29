import TreeNode from "../dataNode";
import { Action, ActionType, Actions } from "./action";

export default class implements Actions {

    private actions: Action[];

    constructor(root: TreeNode) {
        this.actions = [];
        this.recurse(root, undefined);
    }

    get(index: number): Action {
        return this.actions[index];
    }

    get length(): number {
        return this.actions.length;
    }

    private push(action: Action) {
        this.actions.push(action);
    }

    private recurse(node: TreeNode, parent?: TreeNode) {

        if (node.left) {
            this.push({ node, action: ActionType.GO_LEFT, parent });
            this.recurse(node.left, node);
        }

        this.push({ node, action: ActionType.PRINT_VAL, parent });

        if (node.right) {
            this.push({ node, action: ActionType.GO_RIGHT, parent });
            this.recurse(node.right, node);
        }

        this.push({ node, action: ActionType.BACK_TO_PARENT, parent });
    }
}
