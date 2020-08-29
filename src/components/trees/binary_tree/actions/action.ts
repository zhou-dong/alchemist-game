import TreeNode from "../dataNode";

export enum ActionType {
    GO_LEFT,
    GO_RIGHT,
    PRINT_VAL,
    BACK_TO_PARENT
}

export interface Action {
    node: TreeNode;
    action: ActionType;
    parent?: TreeNode;
}

export interface Actions {
    readonly length: number;
    get(index: number): Action;
}
