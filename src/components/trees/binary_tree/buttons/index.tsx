import React from "react";
import ActionGroup from "./TreeButtonGroup";

import TreeNode from "../treeNode";
import { Actions } from "../actions/action";

export interface Props {
    actions: Actions;
    treeNodes: TreeNode[];
    actionsIndex: number;
    setActionIndex: React.Dispatch<React.SetStateAction<number>>;
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>;
    setResults: React.Dispatch<React.SetStateAction<string[]>>
}

export default ({ treeNodes, setTreeNodes, actions, actionsIndex, setActionIndex, setResults }: Props) => (
    <React.Fragment>
        {
            treeNodes.map((treeNode, index) => <ActionGroup
                key={index}
                actions={actions}
                width={60}
                height={26}
                treeNode={treeNode}
                actionsIndex={actionsIndex}
                setActionIndex={setActionIndex}
                setTreeNodes={setTreeNodes}
                setResults={setResults}
            />)
        }
    </React.Fragment>
);
