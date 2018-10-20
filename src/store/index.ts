import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux';

import { EditDistanceState, EditDistanceReducer } from './edit-distance';

export interface ApplicationState {
    editDistance: EditDistanceState;
}

export const rootReducer = combineReducers<ApplicationState>({
    editDistance: EditDistanceReducer,
})