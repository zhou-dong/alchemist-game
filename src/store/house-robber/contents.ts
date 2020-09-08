export const formula = `class Solution {
    
  public int rob(int[] nums) {
      if (nums.length == 0) {
          return 0;
      }

      if (nums.length == 1) {
          return nums[0];
      }

      if (nums.length == 2) {
          return Math.max(nums[0], nums[1]);
      }

      nums[1] = Math.max(nums[0], nums[1]);
      
      for (int i = 2; i < nums.length; i++) {
          nums[i] = Math.max(nums[i] + nums[i-2], nums[i-1]); 
      }

      return nums[nums.length - 1];
  }

}
`;

export const description = `You are a professional robber planning to rob houses
along a street. Each house has a certain amount of money stashed, 
the only constraint stopping you from robbing each of them is that 
adjacent houses have security system connected and it will 
automatically contact the police if two adjacent houses were 
broken into on the same night.

Given a list of non-negative integers representing the amount 
of money of each house, ***determine the maximum amount of money 
you can rob tonight without alerting the police.***`;

export const alUsecases = '';
export const example = `
- Input: \\[2, 4, 3, 1, 6, 5, 7, 6\\]
- Output: 18
- Explanation: 
    + Rob house 1 (money = 2), rob house 3 (money = 3) and rob house 5 (money = 6) rob house 7 (money = 7).
    + Total amount you can rob = 2 + 3 + 6 + 7 = 18.
`;
