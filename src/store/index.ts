import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import { State } from './BasicState';
import { State as WordBreakState } from './word-break/state';
import { State as LongestPalindromicSubstringState } from './longest-palindromic-substring/state';
import { State as LongestPalindromicSubsequenceState } from './longest-palindromic-subsequence/state';
import { State as PalindromePartitioningState } from './palindrome-partitioning/state';
import { State as EggDroppingState } from "./egg-dropping-problem/state";
import { State as TwoSumState } from "./two-sum/state";

import { EditDistance, EditDistanceReducer } from './edit-distance';
import { KnapsackProblem, KnapsackProblemReducer } from './knapsack-problem';
import { RodCuttingProblem, RodCuttingProblemReducer } from './rod-cutting-problem';
import { WildcardMatching, WildcardMatchingReducer } from './wildcard-matching';
import { RegularExpression, RegularExpressionReducer } from './regular-expression';
import { IsSubsequence, IsSubsequenceReducer } from './is-subsequence';
import { IsSubstring, IsSubstringReducer } from './is_substring';
import { SubsetSumProblem, SubsetSumProblemReducer } from './subset-sum-problem';
import { MinimumPathSum, MinimumPathSumReducer } from './minimum-path-sum';
import { WordBreak, WordBreakReducer } from './word-break';
import { EggDroppingProblem, EggDroppingProblemReducer } from './egg-dropping-problem';
import { HouseRobber, HouseRobberReducer } from './house-robber';
import { PalindromePartitioning, PalindromePartitioningReducer } from './palindrome-partitioning';
import { MaximumSubarrayProblem, MaximumSubarrayProblemReducer } from './maximum-subarray-problem';
import { CoinChangeFewestNumber, CoinChangeFewestNumberReducer } from './coin-change-fewest-number';
import { CoinChangeHowManyWays, CoinChangeHowManyWaysReducer } from './coin-change-how-many-ways';
import { LongestCommonSubsequence, LongestCommonSubsequenceReducer } from './longest-common-subsequence';
import { LongestCommonSubstring, LongestCommonSubstringReducer } from './longest-common-substring';
import { MinimumNumberOfJumpsToReachEnd, MinimumNumberOfJumpsToReachEndReducer } from './minimum-number-of-jumps-to-reach-end';
import { MinimumNumberOfJumpsToReachEndIi, MinimumNumberOfJumpsToReachEndIiReducer } from './minimum-number-of-jumps-to-reach-end-ii';
import { LongestIncreasingSubsequence, LongestIncreasingSubsequenceReducer } from './longest-increasing-subsequence';
import { LongestPalindromicSubstring, LongestPalindromicSubstringReducer } from './longest-palindromic-substring';
import { LongestPalindromicSubsequence, LongestPalindromicSubsequenceReducer } from './longest-palindromic-subsequence';
import { BinaryTreeInorderTraversal, BinaryTreeInorderTraversalReducer } from './binary-tree-inorder-traversal';
import { BinaryTreePreorderTraversal, BinaryTreePreorderTraversalReducer } from './binary-tree-preorder-traversal';
import { BinaryTreePostorderTraversal, BinaryTreePostorderTraversalReducer } from './binary-tree-postorder-traversal';
import { TwoSum, TwoSumReducer } from "./two-sum";
import { TrappingRainWater, TrappingRainWaterReducer } from "./trapping-rain-water";

export interface ApplicationState {
    editDistance: State;
    knapsackProblem: State;
    rodCuttingProblem: State;
    wildcardMatching: State;
    regularExpression: State;
    coinChangeFewestNumber: State;
    coinChangeHowManyWays: State;
    isSubsequence: State;
    isSubstring: State;
    longestCommonSubsequence: State;
    longestCommonSubstring: State;
    subsetSumProblem: State;
    minimumNumberOfJumpsToReachEnd: State;
    minimumNumberOfJumpsToReachEndIi: State;
    longestIncreasingSubsequence: State;
    minimumPathSum: State;
    wordBreak: WordBreakState;
    maximumSubarrayProblem: State;
    eggDroppingProblem: EggDroppingState;
    longestPalindromicSubstring: LongestPalindromicSubstringState;
    longestPalindromicSubsequence: LongestPalindromicSubsequenceState;
    palindromePartitioning: PalindromePartitioningState;
    houseRobber: State;
    binaryTreeInorderTraversal: State;
    binaryTreePreorderTraversal: State;
    binaryTreePostorderTraversal: State;
    twoSum: TwoSumState;
    trappingRainWater: State;
}

export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    editDistance: EditDistanceReducer,
    knapsackProblem: KnapsackProblemReducer,
    rodCuttingProblem: RodCuttingProblemReducer,
    wildcardMatching: WildcardMatchingReducer,
    regularExpression: RegularExpressionReducer,
    coinChangeFewestNumber: CoinChangeFewestNumberReducer,
    coinChangeHowManyWays: CoinChangeHowManyWaysReducer,
    isSubsequence: IsSubsequenceReducer,
    isSubstring: IsSubstringReducer,
    longestCommonSubsequence: LongestCommonSubsequenceReducer,
    longestCommonSubstring: LongestCommonSubstringReducer,
    subsetSumProblem: SubsetSumProblemReducer,
    minimumNumberOfJumpsToReachEnd: MinimumNumberOfJumpsToReachEndReducer,
    minimumNumberOfJumpsToReachEndIi: MinimumNumberOfJumpsToReachEndIiReducer,
    longestIncreasingSubsequence: LongestIncreasingSubsequenceReducer,
    minimumPathSum: MinimumPathSumReducer,
    wordBreak: WordBreakReducer,
    maximumSubarrayProblem: MaximumSubarrayProblemReducer,
    eggDroppingProblem: EggDroppingProblemReducer,
    longestPalindromicSubstring: LongestPalindromicSubstringReducer,
    longestPalindromicSubsequence: LongestPalindromicSubsequenceReducer,
    palindromePartitioning: PalindromePartitioningReducer,
    houseRobber: HouseRobberReducer,
    binaryTreeInorderTraversal: BinaryTreeInorderTraversalReducer,
    binaryTreePreorderTraversal: BinaryTreePreorderTraversalReducer,
    binaryTreePostorderTraversal: BinaryTreePostorderTraversalReducer,
    twoSum: TwoSumReducer,
    trappingRainWater: TrappingRainWaterReducer,
});

export const containers = {
    EditDistance,
    KnapsackProblem,
    RodCuttingProblem,
    WildcardMatching,
    RegularExpression,
    CoinChangeFewestNumber,
    CoinChangeHowManyWays,
    IsSubsequence,
    IsSubstring,
    LongestCommonSubsequence,
    LongestCommonSubstring,
    SubsetSumProblem,
    MinimumNumberOfJumpsToReachEnd,
    MinimumNumberOfJumpsToReachEndIi,
    LongestIncreasingSubsequence,
    MinimumPathSum,
    WordBreak,
    MaximumSubarrayProblem,
    EggDroppingProblem,
    LongestPalindromicSubstring,
    LongestPalindromicSubsequence,
    PalindromePartitioning,
    HouseRobber,
    BinaryTreeInorderTraversal,
    BinaryTreePreorderTraversal,
    BinaryTreePostorderTraversal,
    TwoSum,
    TrappingRainWater,
};
