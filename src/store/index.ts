import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import { all } from 'redux-saga/effects';
import { State } from './BasicState';
import { State as WordBreakState } from './word-break/state';
import { State as LongestPalindromicSubstringState } from './longest-palindromic-substring/state';
import { State as LongestPalindromicSubsequenceState } from './longest-palindromic-subsequence/state';
import { State as PalindromePartitioningState } from './palindrome-partitioning/state';

import { EditDistance, EditDistanceReducer, EditDistanceWatchRecord } from './edit-distance';
import { KnapsackProblem, KnapsackProblemReducer, KnapsackProblemWatchRecord } from './knapsack-problem';
import { RodCuttingProblem, RodCuttingProblemReducer, RodCuttingProblemWatchRecord } from './rod-cutting-problem';
import { WildcardMatching, WildcardMatchingReducer, WildcardMatchingWatchRecord } from './wildcard-matching';
import { RegularExpression, RegularExpressionReducer, RegularExpressionWatchRecord } from './regular-expression';
import { IsSubsequence, IsSubsequenceReducer, IsSubsequenceWatchRecord } from './is-subsequence';
import { IsSubstring, IsSubstringReducer, IsSubstringWatchRecord } from './is_substring';
import { SubsetSumProblem, SubsetSumProblemReducer, SubsetSumProblemWatchRecord } from './subset-sum-problem';
import { MinimumPathSum, MinimumPathSumReducer, MinimumPathSumWatchRecord } from './minimum-path-sum';
import { WordBreak, WordBreakReducer, WordBreakWatchRecord } from './word-break';
import { EggDroppingProblem, EggDroppingProblemReducer, EggDroppingProblemWatchRecord } from './egg-dropping-problem';
import { HouseRobber, HouseRobberReducer, HouseRobberWatchRecord } from './house-robber';
import {
    PalindromePartitioning, PalindromePartitioningReducer, PalindromePartitioningWatchRecord
} from './palindrome-partitioning';
import {
    MaximumSubarrayProblem, MaximumSubarrayProblemReducer, MaximumSubarrayProblemWatchRecord
} from './maximum-subarray-problem';
import {
    CoinChangeFewestNumber, CoinChangeFewestNumberReducer, CoinChangeFewestNumberWatchRecord
} from './coin-change-fewest-number';
import {
    CoinChangeHowManyWays, CoinChangeHowManyWaysReducer, CoinChangeHowManyWaysWatchRecord
} from './coin-change-how-many-ways';
import {
    LongestCommonSubsequence, LongestCommonSubsequenceReducer, LongestCommonSubsequenceWatchRecord
} from './longest-common-subsequence';
import {
    LongestCommonSubstring, LongestCommonSubstringReducer, LongestCommonSubstringWatchRecord
} from './longest-common-substring';
import {
    MinimumNumberOfJumpsToReachEnd, MinimumNumberOfJumpsToReachEndReducer, MinimumNumberOfJumpsToReachEndWatchRecord
} from './minimum-number-of-jumps-to-reach-end';
import {
    LongestIncreasingSubsequence, LongestIncreasingSubsequenceReducer, LongestIncreasingSubsequenceWatchRecord
} from './longest-increasing-subsequence';
import {
    LongestPalindromicSubstring, LongestPalindromicSubstringReducer, LongestPalindromicSubstringWatchRecord
} from './longest-palindromic-substring';
import {
    LongestPalindromicSubsequence, LongestPalindromicSubsequenceReducer, LongestPalindromicSubsequenceWatchRecord
} from './longest-palindromic-subsequence';
import {
    BinaryTreeInorderTraversal, BinaryTreeInorderTraversalReducer, BinaryTreeInorderTraversalWatchRecord
} from './binary-tree-inorder-traversal';
import {
    BinaryTreePreorderTraversal, BinaryTreePreorderTraversalReducer, BinaryTreePreorderTraversalWatchRecord
} from './binary-tree-preorder-traversal';
import {
    BinaryTreePostorderTraversal, BinaryTreePostorderTraversalReducer, BinaryTreePostorderTraversalWatchRecord
} from './binary-tree-postorder-traversal';

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
    longestIncreasingSubsequence: State;
    minimumPathSum: State;
    wordBreak: WordBreakState;
    maximumSubarrayProblem: State;
    eggDroppingProblem: State;
    longestPalindromicSubstring: LongestPalindromicSubstringState;
    longestPalindromicSubsequence: LongestPalindromicSubsequenceState;
    palindromePartitioning: PalindromePartitioningState;
    houseRobber: State;
    binaryTreeInorderTraversal: State;
    binaryTreePreorderTraversal: State;
    binaryTreePostorderTraversal: State;
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
};

export function* rootSaga() {
    yield all([
        EditDistanceWatchRecord(),
        KnapsackProblemWatchRecord(),
        RodCuttingProblemWatchRecord(),
        WildcardMatchingWatchRecord(),
        RegularExpressionWatchRecord(),
        CoinChangeFewestNumberWatchRecord(),
        CoinChangeHowManyWaysWatchRecord(),
        IsSubsequenceWatchRecord(),
        IsSubstringWatchRecord(),
        LongestCommonSubsequenceWatchRecord(),
        LongestCommonSubstringWatchRecord(),
        SubsetSumProblemWatchRecord(),
        MinimumNumberOfJumpsToReachEndWatchRecord(),
        LongestIncreasingSubsequenceWatchRecord(),
        MinimumPathSumWatchRecord(),
        WordBreakWatchRecord(),
        MaximumSubarrayProblemWatchRecord(),
        EggDroppingProblemWatchRecord(),
        LongestPalindromicSubstringWatchRecord(),
        LongestPalindromicSubsequenceWatchRecord(),
        PalindromePartitioningWatchRecord(),
        HouseRobberWatchRecord(),
        BinaryTreeInorderTraversalWatchRecord(),
        BinaryTreePreorderTraversalWatchRecord(),
        BinaryTreePostorderTraversalWatchRecord(),
    ]);
}
