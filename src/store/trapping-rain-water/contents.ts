export const formula = `const createLeftMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = 1; i < heights.length; i++) {
        max = Math.max(max, heights[i - 1]);
        result[i] = max;
    }
    return result;
}

const createRightMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = heights.length - 2; i >= 0; i--) {
        max = Math.max(max, heights[i + 1]);
        result[i] = max;
    }
    return result;
}

const trap = (heights: number[]): number[] => {
    const leftMax = createLeftMax(heights);
    const rightMax = createRightMax(heights);

    let waters = 0;
    for (let i = 0; i < heights.length; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        const water = (waterLevel - heights[i]);
        if (water > 0) {
            waters += water;
        }
    }

    return waters;
}
`;

export const description = `
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
`;

export const alUsecases = '';
export const example = `
Example 1:

- Input: arr[] = { 3, 0, 2 }
- Output: 2

Example 2:

- Input: arr[] = { 0, 1, 0, 2, 1 }
- Output: 2

`;
