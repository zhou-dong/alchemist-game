import React from "react";

export interface CircleProps {
    cx: number;
    cy: number;
    r: number;
    fill: string;
    stroke: string;
    strokeWidth: string;
}

export interface TextProps {
    x: number;
    y: number;
    fill: string;
    textContent: string;
    fontSize: string
}

export interface LineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: string;
}

export interface Props {
    circle: CircleProps;
    text: TextProps;
    leftLine?: LineProps;
    rightLine?: LineProps;
}

const Circle = ({ cx, cy, r, fill, stroke, strokeWidth }: CircleProps) => (
    <circle cx={cx} cy={cy} r={r} style={{ stroke, strokeWidth }} fill={fill} />
);

const Text = ({ x, y, fill, textContent, fontSize }: TextProps) => (
    <text x={x} y={y} fill={fill} style={{ fontSize }}>{textContent}</text>
);

const Line = ({ x1, y1, x2, y2, stroke, strokeWidth }: LineProps) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke, strokeWidth }} />
);

export default ({ circle, text, leftLine, rightLine }: Props) => (
    <React.Fragment>
        <Circle {...circle} />
        <Text {...text} />
        {leftLine && <Line {...leftLine} />}
        {rightLine && <Line {...rightLine} />}
    </React.Fragment>
);
