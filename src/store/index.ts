import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { State } from './BasicState';

import { EditDistance, EditDistanceReducer, EditDistanceWatchRecord } from './edit-distance';
import { KnapsackProblem, KnapsackProblemReducer, KnapsackProblemWatchRecord } from './knapsack-problem';
import { RodCuttingProblem, RodCuttingProblemReducer, RodCuttingProblemWatchRecord } from './rod-cutting-problem';
import { WildcardMatching, WildcardMatchingReducer, WildcardMatchingWatchRecord } from './wildcard-matching';
import { RegularExpression, RegularExpressionReducer, RegularExpressionWatchRecord } from './regular-expression';

export interface ApplicationState {
    editDistance: State;
    knapsackProblem: State;
    rodCuttingProblem: State;
    wildcardMatching: State;
    regularExpression: State;
}

export const rootReducer = combineReducers<ApplicationState>({
    editDistance: EditDistanceReducer,
    knapsackProblem: KnapsackProblemReducer,
    rodCuttingProblem: RodCuttingProblemReducer,
    wildcardMatching: WildcardMatchingReducer,
    regularExpression: RegularExpressionReducer,
});

export const containers = {
    EditDistance,
    KnapsackProblem,
    RodCuttingProblem,
    WildcardMatching,
    RegularExpression,
};

export function* rootSaga() {
    yield all([
        EditDistanceWatchRecord(),
        KnapsackProblemWatchRecord(),
        RodCuttingProblemWatchRecord(),
        WildcardMatchingWatchRecord(),
        RegularExpressionWatchRecord(),
    ]);
}
