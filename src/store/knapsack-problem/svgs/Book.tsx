import React from 'react';

export interface Params {
    id: number;
    width: number;
    height: number;
    value: number;
    weight: number;
    fillColor: string;
    weightColor: string;
    valueColor: string;
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

export default ({ width, height, value, weight, fillColor, weightColor, valueColor }: Params) => (
    <svg style={{ width, height }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
        <g>
            <path style={{ fill: fillColor }} d="m443.6,11h-321c-35.4,0-64.6,26.1-64.6,59.4v371.1c0,33.4 
                    26.1,59.4 59.4,59.4h326.2c6.3,0 10.4-4.2 
                    10.4-11.5v-468c0-6.2-4.2-10.4-10.4-10.4zm-321,20.9h310.5v350.3h-315.7c-14.9,0-28.3,5.2-38.6,13.9v-325.7c-1.42109e-14-21.9 
                    19.8-38.5 43.8-38.5zm310.6,449.3h-315.8c-21.9,0-38.6-16.7-38.6-38.6 0-21.9 17.7-38.6 38.6-38.6l315.8,.1v77.1z" />
        </g>
        <text fontSize="90" fontFamily={fontFamily.join(",")} style={{ fontWeight: "normal" }}>
            <tspan x={width * 1.5} y={height * 1.8} style={{ fill: valueColor }}>{value} $</tspan>
            <tspan x={width * 1.5} y={height * 3.1} style={{ fill: weightColor }}>{weight} kg</tspan>
        </text>
    </svg>
);
