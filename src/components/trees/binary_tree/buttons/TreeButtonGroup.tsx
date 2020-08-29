import React from "react";
import Action, { RectProps, TextProps } from "./TreeButton";
import TreeNode, { Status } from "../treeNode";
import { ActionType, Actions } from "../actions/action";

const rx = 8; // rectangle corners rounded
const horizontalMargin = 3;
const verticalMargin = 4;

export interface Props {
    width: number;
    height: number;
    treeNode: TreeNode;
    actions: Actions;
    actionsIndex: number;
    setActionIndex: React.Dispatch<React.SetStateAction<number>>;
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>;
    setResults: React.Dispatch<React.SetStateAction<string[]>>
}

interface ButtonProps extends Props {
    x: number;
    y: number;
}

const calculateStartPosition = (node: TreeNode) => {
    if (node.parent === undefined) {
        return { x: node.circleCx - 95, y: node.circleCy - 78 };
    } else {
        return { x: node.circleCx - 95, y: node.circleCy - 78 };
    }
};

const doNothingClick = () => { };

const handleGoLeftClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>
) => {
    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index !== treeNode.index) {
        return;
    }

    if (currentAction.action === ActionType.GO_LEFT) {
        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    if (node.left) {
                        node.left.status = Status.ACTIVATED;
                    }
                    node.goLeftEnabled = false;
                }
                return node;
            })
        })
        setActionIndex(index => index + 1);
    } else {
        console.log("wrong left")
    }
};

const GoLeft = ({ x, y, width, height, treeNode, setTreeNodes, actions, actionsIndex, setActionIndex }: ButtonProps) => {
    const handleClick = treeNode.goLeftEnabled ? () => handleGoLeftClick(treeNode, actions, actionsIndex, setActionIndex, setTreeNodes) : doNothingClick;

    const disabled = !treeNode.goLeftEnabled;
    const rectProps: RectProps = { x, y, rx, width, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 8, y: y + 18, content: "①LEFT", disabled };
    return <Action rect={rectProps} text={textProps} />;
};

const handlePrintValClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
    setResults: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index !== treeNode.index) {
        return;
    }

    if (currentAction.action === ActionType.PRINT_VAL) {
        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    node.status = Status.PRINTED;
                    node.printValEnabled = false;
                }
                return node;
            })
        });

        setResults(results => {
            const cloned = [...results];
            cloned.push(treeNode.content);
            return cloned;
        });

        setActionIndex(index => index + 1);
    } else {
        console.log("wrong print")
    }
};

const PrintVal = ({ x, y, width, height, treeNode, setTreeNodes, actions, actionsIndex, setActionIndex, setResults }: ButtonProps) => {
    x = x + width + horizontalMargin;
    const handleClick = treeNode.printValEnabled ? () => handlePrintValClick(treeNode, actions, actionsIndex, setActionIndex, setTreeNodes, setResults) : doNothingClick;

    const disabled = !treeNode.printValEnabled;
    const rectProps: RectProps = { x, y, rx, width, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 6, y: y + 18, content: "②PRINT", disabled };
    return <Action rect={rectProps} text={textProps} />;
};

const handleGoRightClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>
) => {
    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index === treeNode.index && currentAction.action === ActionType.GO_RIGHT) {

        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    if (node.right) {
                        node.right.status = Status.ACTIVATED;
                    }
                    node.goRightEnabled = false;
                }
                return node;
            });
        })

        setActionIndex(index => index + 1);
    } else {
        console.log("click right");
    }
};

const GoRight = ({ x, y, width, height, treeNode, setTreeNodes, actions, actionsIndex, setActionIndex }: ButtonProps) => {
    x = x + width * 2 + horizontalMargin * 2;

    const handleClick = treeNode.goRightEnabled ? () => handleGoRightClick(treeNode, actions, actionsIndex, setActionIndex, setTreeNodes) : doNothingClick;

    const disabled = !treeNode.goRightEnabled;
    const rectProps: RectProps = { x, y, rx, width, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 5, y: y + 18, content: "③RIGHT", disabled };

    return <Action rect={rectProps} text={textProps} />;
};

const handleReturnToParentClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>
) => {

    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index === treeNode.index && currentAction.action === ActionType.BACK_TO_PARENT) {

        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    node.status = Status.FINISHED;
                    node.returnToParentEnabled = false;
                }
                return node;
            })
        })

        setActionIndex(index => index + 1);
    } else {

        console.log("go back to parent");
    }

};

const ReturnToParent = ({ x, y, width, height, treeNode, setTreeNodes, actions, actionsIndex, setActionIndex }: ButtonProps) => {
    y = y + height + verticalMargin;

    const handleClick = treeNode.returnToParentEnabled ? () => handleReturnToParentClick(treeNode, actions, actionsIndex, setActionIndex, setTreeNodes) : doNothingClick;

    const disabled = !treeNode.returnToParentEnabled;
    const rectProps: RectProps = { x, y, rx, width: width * 3 + horizontalMargin * 2, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 25, y: y + 18, content: "RETURN TO PARENT", disabled };

    return <Action rect={rectProps} text={textProps} />;
};

export default (props: Props) => {
    const { actions, actionsIndex, treeNode } = props;
    const currentAction = actions.get(actionsIndex);

    if (currentAction && treeNode.index === currentAction.node.index) {
        const { x, y } = calculateStartPosition(props.treeNode);
        const buttonProps: ButtonProps = { ...props, x, y };
        return (
            <React.Fragment>
                <GoLeft {...buttonProps} />
                <PrintVal {...buttonProps} />
                <GoRight {...buttonProps} />
                <ReturnToParent {...buttonProps} />
            </React.Fragment>
        );
    } else {
        return <React.Fragment />
    }
};
