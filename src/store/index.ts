import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { State } from './BasicState';
import { State as WordBreakState } from './word-break/state';
import { State as LongestPalindromicSubstringState } from './longest-palindromic-substring/state';

import { EditDistance, EditDistanceReducer, EditDistanceWatchRecord } from './edit-distance';
import { KnapsackProblem, KnapsackProblemReducer, KnapsackProblemWatchRecord } from './knapsack-problem';
import { RodCuttingProblem, RodCuttingProblemReducer, RodCuttingProblemWatchRecord } from './rod-cutting-problem';
import { WildcardMatching, WildcardMatchingReducer, WildcardMatchingWatchRecord } from './wildcard-matching';
import { RegularExpression, RegularExpressionReducer, RegularExpressionWatchRecord } from './regular-expression';
import { IsSubsequence, IsSubsequenceReducer, IsSubsequenceWatchRecord } from './is-subsequence';
import { SubsetSumProblem, SubsetSumProblemReducer, SubsetSumProblemWatchRecord } from './subset-sum-problem';
import { MinimumPathSum, MinimumPathSumReducer, MinimumPathSumWatchRecord } from './minimum-path-sum';
import { WordBreak, WordBreakReducer, WordBreakWatchRecord } from './word-break';
import { EggDroppingProblem, EggDroppingProblemReducer, EggDroppingProblemWatchRecord } from './egg-dropping-problem';
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
export interface ApplicationState {
    editDistance: State;
    knapsackProblem: State;
    rodCuttingProblem: State;
    wildcardMatching: State;
    regularExpression: State;
    coinChangeFewestNumber: State;
    coinChangeHowManyWays: State;
    isSubsequence: State;
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
}

export const rootReducer = combineReducers<ApplicationState>({
    editDistance: EditDistanceReducer,
    knapsackProblem: KnapsackProblemReducer,
    rodCuttingProblem: RodCuttingProblemReducer,
    wildcardMatching: WildcardMatchingReducer,
    regularExpression: RegularExpressionReducer,
    coinChangeFewestNumber: CoinChangeFewestNumberReducer,
    coinChangeHowManyWays: CoinChangeHowManyWaysReducer,
    isSubsequence: IsSubsequenceReducer,
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
    ]);
}
