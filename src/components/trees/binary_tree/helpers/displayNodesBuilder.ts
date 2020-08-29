import DataNode from "../dataNode";
import cxCalculator from "./treeNodeCxCalculator";
import TreeNode, { Status } from "../treeNode";
import { Props as DisplayNode, NodeStyles as DisplayNodeStyles } from "../display";

import {
    INITIALED_NODE_ATTRIBUTES,
    ACTIVATED_NODE_ATTRIBUTES,
    ACTIVATED_LINE_ATTRIBUTES,
    PRINTED_NODE_ATTRIBUTES,
    FINISHED_NODE_ATTRIBUTES,
    FINISHED_LINE_ATTRIBUTES,
    INITIALED_LINE_ATTRIBUTES,
} from "../display/nodeStyles";

const createDisplayNodeStyles = (status: Status): DisplayNodeStyles => {
    switch (status) {
        case Status.INITIAL: return INITIALED_NODE_ATTRIBUTES;
        case Status.ACTIVATED: return ACTIVATED_NODE_ATTRIBUTES;
        case Status.PRINTED: return PRINTED_NODE_ATTRIBUTES;
        case Status.FINISHED: return FINISHED_NODE_ATTRIBUTES;
        default: return INITIALED_NODE_ATTRIBUTES;
    }
};

const createDisplayNode = ({ status, circleCx, circleCy, circleR, content, textX, textY }: TreeNode): DisplayNode => ({
    nodeStyles: createDisplayNodeStyles(status), circleCx, circleCy, circleR, content, textX, textY
});

export const createDisplayNodes = (propsList: TreeNode[]): DisplayNode[] => {
    const results: Map<number, DisplayNode> = new Map();

    propsList.forEach(props => {
        results.set(props.index, createDisplayNode(props))
    });

    // connect children
    propsList.forEach(props => {
        const treeNodeProps = results.get(props.index)!
        if (props.left) {
            treeNodeProps.left = results.get(props.left.index);
            treeNodeProps.leftLineStyles = INITIALED_LINE_ATTRIBUTES;
        }
        if (props.right) {
            treeNodeProps.right = results.get(props.right.index);
            treeNodeProps.rightLineStyles = INITIALED_LINE_ATTRIBUTES;
        }
    });

    // update line style
    propsList.forEach(props => {
        if (props.parent) {
            const parentTreeNodeProps: DisplayNode = results.get(props.parent.index)!;
            switch (props.status) {
                case Status.ACTIVATED: {
                    if (props === props.parent.left) {
                        parentTreeNodeProps.leftLineStyles = ACTIVATED_LINE_ATTRIBUTES;
                    } else if (props === props.parent.right) {
                        parentTreeNodeProps.rightLineStyles = ACTIVATED_LINE_ATTRIBUTES;
                    }
                    break;
                }
                case Status.PRINTED: {
                    if (props === props.parent.left) {
                        parentTreeNodeProps.leftLineStyles = ACTIVATED_LINE_ATTRIBUTES;
                    } else if (props === props.parent.right) {
                        parentTreeNodeProps.rightLineStyles = ACTIVATED_LINE_ATTRIBUTES;
                    }
                    break;
                }
                case Status.FINISHED: {
                    if (props === props.parent.left) {
                        parentTreeNodeProps.leftLineStyles = FINISHED_LINE_ATTRIBUTES;
                    } else if (props === props.parent.right) {
                        parentTreeNodeProps.rightLineStyles = FINISHED_LINE_ATTRIBUTES;
                    }
                    break;
                }
            }
        }
    });

    return Array.from(results.values());
};

export const createTreeNodes = (root: DataNode, width: number, heightUnit: number, radius: number, y: number): TreeNode[] => {

    const results: Map<number, TreeNode> = new Map();
    const cxMap = cxCalculator(root.depth, width);

    const createTreeNode = (node: DataNode, cy: number, parent?: TreeNode) => {
        const cx: number = cxMap.get(node.index)!.cx;
        const treeNode: TreeNode = {
            index: node.index,
            status: Status.INITIAL,
            circleCx: cx,
            circleCy: cy,
            circleR: radius,
            content: node.val,
            textX: cx - 6,
            textY: cy + 7,
            parent,
            returnToParentEnabled: true,
            printValEnabled: true,
            goLeftEnabled: node.left ? true : false,
            goRightEnabled: node.right ? true : false,
        };

        results.set(node.index, treeNode);

        if (node.left) {
            createTreeNode(node.left, cy + heightUnit, treeNode);
        }

        if (node.right) {
            createTreeNode(node.right, cy + heightUnit, treeNode);
        }
    }

    const connectChildren = (node: DataNode) => {
        const treeNode: TreeNode = results.get(node.index)!;

        if (node.left) {
            treeNode.left = results.get(node.left.index);
            connectChildren(node.left);
        }

        if (node.right) {
            treeNode.right = results.get(node.right.index);
            connectChildren(node.right);
        }
    };

    createTreeNode(root, y);
    connectChildren(root);

    return Array.from(results.values());
};
