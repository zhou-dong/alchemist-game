import React from "react";
import { DISABLED, ENABLED } from "./buttonStyles";

export interface RectStyles {
    fill: string;
    stroke?: string;
    strokeWidth?: string;
    fillOpacity: number;
    strokeOpacity?: number;
}

export interface TextStyles {
    fill: string;
    fontSize?: string;
    fontFamily?: string;
}

export interface Styles {
    rect: RectStyles;
    text: TextStyles;
}

export interface RectProps {
    x: number;
    y: number;
    rx: number;
    width: number;
    height: number;
    disabled: boolean;
    handleClick: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void | undefined;
}

export interface TextProps {
    x: number;
    y: number;
    content: string;
    disabled: boolean;
}

export interface Props {
    rect: RectProps;
    text: TextProps;
}

const getRectStyles = (disabled: boolean) => {
    let results = null;
    if (disabled) {
        results = { ...DISABLED.rect };
    } else {
        results = { ...ENABLED.rect };
    }
    delete results.stroke;
    return results;
};

const getRectStroke = (disabled: boolean) => {
    return disabled ? DISABLED.rect.stroke : ENABLED.rect.stroke;
};

const Rect = ({ x, y, rx, width, height, handleClick, disabled }: RectProps) => (
    <rect
        width={width}
        height={height}
        x={x}
        y={y}
        stroke={getRectStroke(disabled)}
        style={{ ...getRectStyles(disabled) }}
        onClick={handleClick}
        rx={rx}
        onMouseOver={(event) => {
            if (!disabled) {
                event.currentTarget.setAttribute("stroke", "#1976d2");
                event.currentTarget.style.cursor = "pointer";
            }
        }}
        onMouseLeave={(event) => {
            if (!disabled) {
                event.currentTarget.setAttribute("stroke", `${getRectStroke(disabled)}`);
            }
        }}
    />
);

const getTextStyles = (disabled: boolean) => {
    return disabled ? DISABLED.text : ENABLED.text;
};

const Text = ({ x, y, content, disabled }: TextProps) => (
    <text x={x} y={y} style={{ ...getTextStyles(disabled) }}>{content}</text>
);

export default ({ rect, text }: Props) => (
    <React.Fragment>
        <Text {...text} />
        <Rect {...rect} />
    </React.Fragment>
);
