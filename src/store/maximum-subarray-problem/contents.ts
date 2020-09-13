export const formula = `
function maxSubArray(nums: number[]): number {

  for (let i = 1; i < nums.length; i++) {
      if (nums[i - 1] > 0) {
        nums[i] = nums[i] + nums[i-1];
      }
  }

  return Math.max(...nums);
};
`;

export const description = `Finding the contiguous subarray within a 
one-dimensional array of numbers which has the 
largest sum. The list usually contains both 
positive and negative numbers. `;

export const alUsecases = '';
export const example = `

- **Input**: \\[-2, -1, 3, 5, 10, -2, -1, 2, 5, -2\\]
- **Output**: 22
- **Explanation**: \\[3, 5, 10, -2, -1, 2, 5\\] has the largest sum = 22.
`;
