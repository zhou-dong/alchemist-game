import React from "react";
import ActionGroup from "./TreeButtonGroup";

import TreeNode from "../treeNode";
import { Actions } from "../actions/action";

export interface Props {
    challengeId: number;
    actions: Actions;
    treeNodes: TreeNode[];
    actionsIndex: number;
    setActionIndex: React.Dispatch<React.SetStateAction<number>>;
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>;
    setResults: React.Dispatch<React.SetStateAction<string[]>>;
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
    leftTextContent: string;
    middleTextContent: string;
    rightTextContent: string;
    goLeftIndex: number;
    printIndex: number;
    goRightIndex: number;
}

export default ({
    challengeId,
    treeNodes,
    actions,
    actionsIndex,
    leftTextContent,
    middleTextContent,
    rightTextContent,
    goLeftIndex,
    printIndex,
    goRightIndex,
    setTreeNodes,
    setActionIndex,
    setResults,
    setAlertOpen
}: Props) => (<React.Fragment> {
    treeNodes.map((treeNode, index) => <ActionGroup
        key={index}
        actions={actions}
        width={55}
        height={25}
        treeNode={treeNode}
        actionsIndex={actionsIndex}
        setActionIndex={setActionIndex}
        setTreeNodes={setTreeNodes}
        setResults={setResults}
        setAlertOpen={setAlertOpen}
        challengeId={challengeId}
        leftTextContent={leftTextContent}
        middleTextContent={middleTextContent}
        rightTextContent={rightTextContent}
        goLeftIndex={goLeftIndex}
        printIndex={printIndex}
        goRightIndex={goRightIndex}
    />)}
</React.Fragment>);
