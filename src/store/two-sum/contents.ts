export const formula = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();

        for (int i=0; i <nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                return new int[]{ map.get(target - nums[i]), i };
            }
            map.put(nums[i], i);
        }

        return new int[0];
    }
}
`;

export const description = `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

\\- From Leetcode.
`;

export const alUsecases = '';
export const example = `

Example 1:

- Input: nums = [1,3,7,5], target = 12
- Output: [2,3]
-  Output: Because nums[2] + nums[3] == 12, we return [2, 3].

Example 2:

- Input: nums = [3,6,1], target = 4
- Output: [0,2]

Example 3:

- Input: nums = [5,5,1], target = 10
- Output: [0,1]
`;
