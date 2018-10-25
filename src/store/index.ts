import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { State } from './BasicState';

import { EditDistanceReducer, EditDistance, EditDistanceWatchRecord } from './edit-distance';

export interface ApplicationState {
    editDistance: State;
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
