import React, { useState } from "react";
import Node from "./dataNode";
import TreeNode from "./treeNode";
import Tree from "./tree";
import { createTreeNodes } from "./helpers/displayNodesBuilder";
import ButtonGroups from "./buttons";
import { InOrderActions } from "./actions";

export { Node };

export interface Props {
    root: Node;
    svgHeight: number;
    svgWidth: number;
    heightUnit: number;
    nodeRadius: number;
    y: number;
}

export default ({ root, svgHeight, svgWidth, heightUnit, nodeRadius, y }: Props) => {
    const [results, setResults] = useState<string[]>([]);
    const [treeNodes, setTreeNodes] = useState<TreeNode[]>(createTreeNodes(root, svgWidth, heightUnit, nodeRadius, y));
    const [actionIndex, setActionIndex] = useState<number>(0);

    return (
        <React.Fragment>
            <svg height={svgHeight} width={svgWidth}>
                <Tree nodes={treeNodes} />
                <ButtonGroups
                    actions={new InOrderActions(root)}
                    treeNodes={treeNodes}
                    actionsIndex={actionIndex}
                    setActionIndex={setActionIndex}
                    setTreeNodes={setTreeNodes}
                    setResults={setResults}
                />
            </svg>
        </React.Fragment>
    );
};
