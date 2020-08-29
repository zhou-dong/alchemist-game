import React from "react";
import LowLevelDisplayNode, { LineProps } from "./LowLevelDisplayNode";
import {
    calculateLeftLinePosition,
    LinePosition,
    NodePosition,
    calculateRightLinePosition
} from "./treeLinePositionCalculator";

export interface CircleStyles {
    fill: string;
    stroke: string;
    strokeWidth: string;
}

export interface TextStyles {
    fill: string;
    fontSize: string
}

export interface LineStyles {
    stroke: string;
    strokeWidth: string;
}

export interface NodeStyles {
    circleStyles: CircleStyles;
    textStyles: TextStyles;
}

export interface Props {
    circleCx: number;
    circleCy: number;
    circleR: number;

    content: string;
    textX: number;
    textY: number;

    nodeStyles: NodeStyles;

    leftLineStyles?: LineStyles;
    rightLineStyles?: LineStyles;

    left?: Props;
    right?: Props;
}

const createNodePosition = (props: Props): NodePosition => (
    new NodePosition(props.circleCx, props.circleCy, props.circleR)
);

const getLeftLinePosition = (props: Props, left: Props): LinePosition => (
    calculateLeftLinePosition(createNodePosition(props), createNodePosition(left))
);

const getRightLinePosition = (props: Props, right: Props): LinePosition => (
    calculateRightLinePosition(createNodePosition(props), createNodePosition(right))
);

const getLeftLineProps = (props: Props): LineProps | undefined => (
    (props.left && props.leftLineStyles) && { ...getLeftLinePosition(props, props.left), ...props.leftLineStyles }
);

const getRightLineProps = (props: Props): LineProps | undefined => (
    (props.right && props.rightLineStyles) && { ...getRightLinePosition(props, props.right), ...props.rightLineStyles }
);

export default (props: Props) => (
    <LowLevelDisplayNode
        circle={{ ...props.nodeStyles.circleStyles, cx: props.circleCx, cy: props.circleCy, r: props.circleR }}
        text={{ ...props.nodeStyles.textStyles, x: props.textX, y: props.textY, textContent: props.content }}
        leftLine={getLeftLineProps(props)}
        rightLine={getRightLineProps(props)}
    />
);
