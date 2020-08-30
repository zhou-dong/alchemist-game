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
}

export default ({ challengeId, treeNodes, setTreeNodes, actions, actionsIndex, setActionIndex, setResults, setAlertOpen }: Props) => (
    <React.Fragment>
        {
            treeNodes.map((treeNode, index) => <ActionGroup
                key={index}
                actions={actions}
                width={55}
                height={20}
                treeNode={treeNode}
                actionsIndex={actionsIndex}
                setActionIndex={setActionIndex}
                setTreeNodes={setTreeNodes}
                setResults={setResults}
                setAlertOpen={setAlertOpen}
                challengeId={challengeId}
            />)
        }
    </React.Fragment>
);
