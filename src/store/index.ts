import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { State } from './BasicState';

import { EditDistance, EditDistanceReducer, EditDistanceWatchRecord } from './edit-distance';
import { KnapsackProblem, KnapsackProblemReducer, KnapsackProblemWatchRecord } from './knapsack-problem';
import { RodCuttingProblem, RodCuttingProblemReducer, RodCuttingProblemWatchRecord } from './rod-cutting-problem';
import { WildcardMatching, WildcardMatchingReducer, WildcardMatchingWatchRecord } from './wildcard-matching';
import { RegularExpression, RegularExpressionReducer, RegularExpressionWatchRecord } from './regular-expression';
import { 
    CoinChangeFewestNumber, 
    CoinChangeFewestNumberReducer, 
    CoinChangeFewestNumberWatchRecord
} from './coin-change-fewest-number';
import {
    CoinChangeHowManyWays,
    CoinChangeHowManyWaysReducer,
    CoinChangeHowManyWaysWatchRecord
} from './coin-change-how-many-ways';

export interface ApplicationState {
    editDistance: State;
    knapsackProblem: State;
    rodCuttingProblem: State;
    wildcardMatching: State;
    regularExpression: State;
    coinChangeFewestNumber: State;
    coinChangeHowManyWays: State;
}

export const rootReducer = combineReducers<ApplicationState>({
    editDistance: EditDistanceReducer,
    knapsackProblem: KnapsackProblemReducer,
    rodCuttingProblem: RodCuttingProblemReducer,
    wildcardMatching: WildcardMatchingReducer,
    regularExpression: RegularExpressionReducer,
    coinChangeFewestNumber: CoinChangeFewestNumberReducer,
    coinChangeHowManyWays: CoinChangeHowManyWaysReducer,
});

export const containers = {
    EditDistance,
    KnapsackProblem,
    RodCuttingProblem,
    WildcardMatching,
    RegularExpression,
    CoinChangeFewestNumber,
    CoinChangeHowManyWays,
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
    ]);
}
