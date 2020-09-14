export const formula = `public int jump(int[] nums) {
    int[] dp = new int[nums.length];

    dp[0] = 0;
    for (int i = 1; i < dp.length; i++) {
        dp[i] = nums.length + 1;
    }

    for (int i = 0; i < nums.length; i++) {
        for (int j = 1; j <= nums[i]; j++ ) {
            if (i + j >= nums.length) {
                return dp[dp.length - 1];
            }
            dp[i + j] = Math.min(dp[i + j], dp[i] + 1); 
        }
    }

    return dp[dp.length - 1];
}
`;

export const description = `Given an array of non negative integers, start 
from the first element and reach the last by 
jumping. The jump length can be at most the 
value at the current position in the array. 
Optimum result is when you reach the goal in
minimum number of jumps.`;

export const alUsecases = '';
export const example = `
- Input: \\[2, 3, 1, 1, 4, 1, 2, 3]
- Output: 3
- Explanation: 
    + The minimum number of jumps to reach the last index is 3.
    + Paths: 2 -> 3 -> 4 -> end.
`;
