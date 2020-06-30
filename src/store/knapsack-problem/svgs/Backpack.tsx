import React from 'react';

export interface Params {
    height: number;
    maxWeight: number;
    currentValue: number;
    currentWeight: number;
    potentialValue: number;
}
const fontFamily = [
    "Circular",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Helvetica Neue",
    "sans-serif",
    "monospace"
];

const fillColor = "none"
const strokeColor = "gray"
const strokeWidth = "1"

export default ({ height, currentValue, maxWeight, currentWeight, potentialValue }: Params) => {

    const startX = potentialValue < 0 ? 0.2 : 0.8
    const fillContent = potentialValue < 0 ? "Current item is too heavy, can't be put into knapsack." : `Updated Value: $${potentialValue}, if took current item.`
    return (
        <svg style={{ height }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.996 511.996">
            <g>
                <path strokeWidth={strokeWidth} stroke={strokeColor} style={{ fill: fillColor }} d="M378.791,501.758H138.53c-51.497,0-91.812-44.339-86.927-95.601l23.02-241.787
			c5.007-52.552,49.152-92.692,101.939-92.692h162.55c52.541,0,96.553,39.762,101.878,92.027l19.804,245.893
			C464.408,460.143,429.469,501.758,378.791,501.758"/>
                <path strokeWidth={strokeWidth} stroke={strokeColor} style={{ fill: fillColor }} d="M195.588,71.678H316.41c-4.762-23.337-25.446-40.96-50.176-40.96h-20.48
			C221.034,30.718,200.339,48.341,195.588,71.678 M327.674,92.158h-143.36c-5.652,0-10.24-4.577-10.24-10.24
			c0-39.516,32.164-71.68,71.68-71.68h20.48c39.526,0,71.68,32.164,71.68,71.68C337.914,87.581,333.337,92.158,327.674,92.158"/>
            </g>
            <path strokeWidth={strokeWidth} stroke={strokeColor} style={{ fill: fillColor }} d="M74.854,162.773C103.148,235.272,173.486,286.718,256,286.718
		c85.207,0,157.44-54.866,183.767-131.133c-8.817-48.2-50.883-83.907-100.649-83.907h-162.55
		C124.314,71.678,80.599,111.01,74.854,162.773"/>
            <text fontSize="20" fontFamily={fontFamily.join(",")} style={{ fill: "black", fontWeight: "normal" }}>
                <tspan x={100 * 2} y={100 * 1.2}>KNAPSACK</tspan>
                <tspan x={100 * 1.5} y={100 * 1.6}>Maximum Weight: {maxWeight} kg</tspan>
                <tspan x={100 * 1.5} y={100 * 2.0}>Current &nbsp; Weight: &nbsp; {currentWeight} kg</tspan>
                <tspan x={100 * 1.5} y={100 * 2.4}>Current &nbsp; Value: &nbsp;&nbsp;&nbsp;&nbsp; {currentValue} $</tspan>
                <tspan x={100 * startX} y={100 * 3.6}>{fillContent}</tspan>
            </text>
        </svg>
    );
};
