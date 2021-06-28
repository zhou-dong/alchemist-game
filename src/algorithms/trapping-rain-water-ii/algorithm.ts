export const createLeftMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = 1; i < heights.length; i++) {
        max = Math.max(max, heights[i - 1]);
        result[i] = max;
    }
    return result;
};

export const createRightMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = heights.length - 2; i >= 0; i--) {
        max = Math.max(max, heights[i + 1]);
        result[i] = max;
    }
    return result;
};

export class Coordinate {
    left: number;
    right: number;
    maxLeft: number;
    maxRight: number;

    constructor(left: number, right: number, maxLeft: number, maxRight: number) {
        this.left = left;
        this.right = right;
        this.maxLeft = maxLeft;
        this.maxRight = maxRight;
    }
}

export interface Guiders {
    directions: number[];
    coordinates: Coordinate[];
    waters: number[];
}

export const createGuiders = (heights: number[]): Guiders => {
    const directions: number[] = [];
    const coordinates: Coordinate[] = [];
    const waters: number[] = [];

    let maxLeft = heights[0];
    let maxRight = heights[heights.length - 1];

    let left = 1;
    let right = heights.length - 2;
    let total = 0;

    coordinates.push(new Coordinate(left, right, maxLeft, maxRight));
    waters.push(0);

    while (left <= right) {

        if (maxLeft > maxRight) {
            const min = maxRight;
            const water = min - heights[right];
            if (water > 0) {
                total += water;
            }
            maxRight = Math.max(maxRight, heights[right]);
            right--;
            directions.push(1);
        } else {
            const min = maxLeft;
            const water = min - heights[left];
            if (water > 0) {
                total += water;
            }
            maxLeft = Math.max(maxLeft, heights[left]);
            left++;
            directions.push(0);
        }

        coordinates.push(new Coordinate(left, right, maxLeft, maxRight));
        waters.push(total);
    }

    return { directions, coordinates, waters };
};

const createDPTable = (heights: number[]): number[] => {

    const leftMax = createLeftMax(heights);
    const rightMax = createRightMax(heights);

    const waters: number[] = new Array(heights.length).fill(0);

    for (let i = 0; i < heights.length; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        const water = (waterLevel - heights[i]);
        if (water > 0) {
            waters[i] = water;
        }
    }

    return waters;
};

export default createDPTable;
