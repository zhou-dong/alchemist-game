import { basicInfo as EditDistance } from '../store/edit-distance/initialState';
import { basicInfo as KnapsackProblem } from '../store/knapsack-problem/initialState';
import { basicInfo as RodCuttingProblem } from '../store/rod-cutting-problem/initialState';
import { basicInfo as WildcardMatching } from '../store/wildcard-matching/initialState';
import { basicInfo as RegularExpression } from '../store/regular-expression/initialState';
import { basicInfo as CoinChangeFewestNumber } from '../store/coin-change-fewest-number/initialState';
import { basicInfo as CoinChangeHowManyWays } from '../store/coin-change-how-many-ways/initialState';
import { basicInfo as IsSubsequence } from '../store/is-subsequence/initialState';
import { basicInfo as IsSubstring } from '../store/is_substring/initialState';
import { basicInfo as LongestCommonSubsequence } from '../store/longest-common-subsequence/initialState';
import { basicInfo as LongestCommonSubstring } from '../store/longest-common-substring/initialState';
import { basicInfo as SubsetSumProblem } from '../store/subset-sum-problem/initialState';
import { basicInfo as MinimumOfJumpsToReachEnd } from '../store/minimum-number-of-jumps-to-reach-end/initialState';
import { basicInfo as MinimumOfJumpsToReachEndII } from '../store/minimum-number-of-jumps-to-reach-end-ii/initialState';
import { basicInfo as LongestIncreasingSubsequence } from '../store/longest-increasing-subsequence/initialState';
import { basicInfo as MinimumPathSum } from '../store/minimum-path-sum/initialState';
import { basicInfo as WordBreak } from '../store/word-break/initialState';
import { basicInfo as MaximumSubarrayProblem } from '../store/maximum-subarray-problem/initialState';
import { basicInfo as EggDroppingProblem } from '../store/egg-dropping-problem/initialState';
import { basicInfo as LongestPalindromicSubstring } from '../store/longest-palindromic-substring/initialState';
import { basicInfo as LongestPalindromicSubsequence } from '../store/longest-palindromic-subsequence/initialState';
import { basicInfo as PalindromePartitioning } from '../store/palindrome-partitioning/initialState';
import { basicInfo as HouseRobber } from '../store/house-robber/initialState';
import { basicInfo as BinaryTreeInorderTraversal } from '../store/binary-tree-inorder-traversal/initialState';
import { basicInfo as BinaryTreePreorderTraversal } from '../store/binary-tree-preorder-traversal/initialState';
import { basicInfo as BinaryTreePostorderTraversal } from '../store/binary-tree-postorder-traversal/initialState';
import { basicInfo as TwoSum } from "../store/two-sum/initialState";

enum Names {
    Edit_Distance = 'edit-distance',
    Word_Break = 'word-break',
    Minimum_Path_Sum = 'minimum-path-sum',
    Knapsack_Problem = 'knapsack-problem',
    RodCutting_Problem = 'rod-cutting-problem',
    Wildcard_Matching = 'wildcard-matching',
    Regular_Expression = 'regular-expression-matching',
    Coin_Change_Fewest_Number = 'coin-change-fewest-number',
    Coin_Change_How_Many_Ways = 'coin-change-how-many-ways',
    Is_Subsequence = 'is-subsequence',
    Is_Substring = 'is-substring',
    Longest_Common_Subsequence = 'longest-common-subsequence',
    Longest_Common_Substring = 'longest-common-substring',
    Subset_Sum_Problem = 'subset-sum-problem',
    Minimum_Jumps_To_End = 'minimum-number-of-jumps-to-reach-end',
    Minimum_Jumps_To_End_II = 'minimum-number-of-jumps-to-reach-end-ii',
    Longest_Increasing_Subsequence = 'longest-increasing-subsequence',
    Maximum_Subarray_Problem = 'maximum-subarray-problem',
    EggDropping_Problem = 'egg-dropping-problem',
    Longest_Palindromic_Substring = 'longest-palindromic-substring',
    Longest_Palindromic_Subsequence = 'longest-palindromic-subsequence',
    Palindrome_Partitioning = 'palindrome-partitioning',
    House_Robber = 'house-robber',
    Two_Sum = "two-sum",
    Binary_Tree_Preorder_Traversal = 'binary-tree-preorder-traversal',
    Binary_Tree_Inorder_Traversal = 'binary-tree-inorder-traversal',
    Binary_Tree_Postorder_Traversal = 'binary-tree-postorder-traversal',
    Two_Three_Tree_vs_Red_Black_tree = "two-three-tree-red-black-tree",
    LRU_Cache = "lru-cache",
}

export const getId = (name: string): number => {
    switch (name) {
        case Names.Edit_Distance: return EditDistance.id;
        case Names.Knapsack_Problem: return KnapsackProblem.id;
        case Names.RodCutting_Problem: return RodCuttingProblem.id;
        case Names.Wildcard_Matching: return WildcardMatching.id;
        case Names.Regular_Expression: return RegularExpression.id;
        case Names.Coin_Change_Fewest_Number: return CoinChangeFewestNumber.id;
        case Names.Coin_Change_How_Many_Ways: return CoinChangeHowManyWays.id;
        case Names.Is_Subsequence: return IsSubsequence.id;
        case Names.Is_Substring: return IsSubstring.id;
        case Names.Longest_Common_Subsequence: return LongestCommonSubsequence.id;
        case Names.Longest_Common_Substring: return LongestCommonSubstring.id;
        case Names.Subset_Sum_Problem: return SubsetSumProblem.id;
        case Names.Minimum_Jumps_To_End: return MinimumOfJumpsToReachEnd.id;
        case Names.Minimum_Jumps_To_End_II: return MinimumOfJumpsToReachEndII.id;
        case Names.Longest_Increasing_Subsequence: return LongestIncreasingSubsequence.id;
        case Names.Minimum_Path_Sum: return MinimumPathSum.id;
        case Names.Word_Break: return WordBreak.id;
        case Names.Maximum_Subarray_Problem: return MaximumSubarrayProblem.id;
        case Names.EggDropping_Problem: return EggDroppingProblem.id;
        case Names.Longest_Palindromic_Substring: return LongestPalindromicSubstring.id;
        case Names.Longest_Palindromic_Subsequence: return LongestPalindromicSubsequence.id;
        case Names.Palindrome_Partitioning: return PalindromePartitioning.id;
        case Names.House_Robber: return HouseRobber.id;
        case Names.Binary_Tree_Inorder_Traversal: return BinaryTreeInorderTraversal.id;
        case Names.Binary_Tree_Preorder_Traversal: return BinaryTreePreorderTraversal.id;
        case Names.Binary_Tree_Postorder_Traversal: return BinaryTreePostorderTraversal.id;
        case Names.Two_Three_Tree_vs_Red_Black_tree: return -1;
        case Names.LRU_Cache: return -1;
        case Names.Two_Sum: return TwoSum.id;
        default: return -1;
    }
};

export default Names;
