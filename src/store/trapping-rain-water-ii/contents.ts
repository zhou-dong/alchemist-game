export const formula = `class Solution {
    public int trap(int[] height) {

        if(height.length < 3 ) {
            return 0;
        }

        int leftMax = height[0];
        int rightMax = height[height.length-1];
        int i = 1;
        int j = height.length-2;
        int sum = 0;
        
        while(i <= j ) {
            leftMax = Math.max(leftMax, height[i]) ;
            rightMax = Math.max(rightMax, height[j]);
            int min = Math.min(leftMax, rightMax);

            if (leftMax < rightMax) {
                sum += min > height[i] ? min - height[i]  : 0;
                i ++ ;
            } else {
                sum += min > height[j] ? min - height[j]  : 0;
                j --;
            }
        }

        return sum;
    }
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
