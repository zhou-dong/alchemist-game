export const createLeftMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = 1; i < heights.length; i++) {
        max = Math.max(max, heights[i - 1]);
        result[i] = max;
    }
    return result;
}

export const createRightMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = heights.length - 2; i >= 0; i--) {
        max = Math.max(max, heights[i + 1]);
        result[i] = max;
    }
    return result;
}

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
