import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { EditDistanceState, EditDistanceReducer, EditDistance, EditDistanceWatchRecord } from './edit-distance';

export interface ApplicationState {
    editDistance: EditDistanceState;
}

export const rootReducer = combineReducers<ApplicationState>({
    editDistance: EditDistanceReducer,
});

export const containers = {
    EditDistance,
};

export function* rootSaga() {
    yield all([
        EditDistanceWatchRecord(),
    ]);
}
