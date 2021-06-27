export const createLeftMax = (heights: number[]): number[] => {
    const result: number[] = new Array(heights.length).fill(0);
    let max = 0;
    for (let i = 1; i < heights.length; i++) {
        max = Math.max(max, heights[i - 1]);
        result[i] = max;
    }
    return result;
}

export const createRightMax = (nums: number[]): number[] => {
    const result: number[] = new Array(nums.length).fill(0);
    let max = 0;
    for (let i = nums.length - 2; i >= 0; i--) {
        max = Math.max(max, nums[i + 1]);
        result[i] = max;
    }
    return result;
}

const createDPTable = (nums: number[]): number[] => {

    const leftMax = createLeftMax(nums);
    const rightMax = createRightMax(nums);

    const waters: number[] = new Array(nums.length).fill(0);

    for (let i = 0; i < nums.length; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        const water = (waterLevel - nums[i]);
        if (water > 0) {
            waters[i] = water;
        }
    }

    return waters;
};

export default createDPTable;
