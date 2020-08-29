import { LineStyles, NodeStyles } from "./HighLevelDisplayNode";

export const INITIALED_LINE_ATTRIBUTES: LineStyles = {
    stroke: "gray",
    strokeWidth: "1",
};

export const INITIALED_NODE_ATTRIBUTES: NodeStyles = {
    textStyles: {
        fill: "gray",
        fontSize: "20",
    },
    circleStyles: {
        fill: "white",
        stroke: "gray",
        strokeWidth: "1",
    },
};

export const ACTIVATED_LINE_ATTRIBUTES: LineStyles = {
    stroke: "lightblue",
    strokeWidth: "1",
};

export const ACTIVATED_NODE_ATTRIBUTES: NodeStyles = {
    textStyles: {
        fill: "gray",
        fontSize: "20",
    },
    circleStyles: {
        fill: "lightblue",
        stroke: "",
        strokeWidth: "1",
    }
};

export const FINISHED_LINE_ATTRIBUTES: LineStyles = {
    stroke: "green",
    strokeWidth: "1",
};

export const FINISHED_NODE_ATTRIBUTES: NodeStyles = {
    textStyles: {
        fill: "white",
        fontSize: "20",
    },
    circleStyles: {
        fill: "green",
        stroke: "",
        strokeWidth: "1",
    },
};

export const PRINTED_NODE_ATTRIBUTES: NodeStyles = {
    textStyles: {
        fill: "white",
        fontSize: "20",
    },
    circleStyles: {
        fill: "gold",
        stroke: "",
        strokeWidth: "1",
    },
};
