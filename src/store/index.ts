import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { State } from './BasicState';

import { EditDistance, EditDistanceReducer, EditDistanceWatchRecord } from './edit-distance';
import { KnapsackProblem, KnapsackProblemReducer, KnapsackProblemWatchRecord } from './knapsack-problem';

export interface ApplicationState {
    editDistance: State;
    knapsackProblem: State;
}

export const rootReducer = combineReducers<ApplicationState>({
    editDistance: EditDistanceReducer,
    knapsackProblem: KnapsackProblemReducer,
});

export const containers = {
    EditDistance,
    KnapsackProblem,
};

export function* rootSaga() {
    yield all([
        EditDistanceWatchRecord(),
        KnapsackProblemWatchRecord(),
    ]);
}
