export const formula = `// Core Formula:
if (array[x] < array[y]) {
  values[y] = Math.max(values[y], values[x] + 1);
} 

// Full Java Code:
class Solution {
  public int lengthOfLIS(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }

    int[] dp = new int[nums.length];
    
    for (int i = 0; i < dp.length; i++) {
        dp[i] = 1;
    }

    for (int i = 1; i < dp.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    int max = 1;
    for (int i = 0; i < dp.length; i++) {
        max = Math.max(max, dp[i]);
    }
    return max;
  }
}
`;

export const description = `Given an unsorted array of integers, find the 
length of longest increasing subsequence. `;

export const alUsecases = '';

export const example = `
- Given \\[6, 7, 0, 1, 9, 3, 5, 8, 4\\]
- The longest increasing subsequence is \\[0, 1, 3, 5, 8\\], therefore the length is 5.
`;
