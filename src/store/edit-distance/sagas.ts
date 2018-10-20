import { call, put, take, fork } from 'redux-saga/effects';
import axios from 'axios';
import { action } from 'typesafe-actions';

import { ActionTypes } from './types';
import state from './initialState';

function* getRecord() {
    const response = yield call(axios.get, `/record/algorithm/${state.id}`);
    yield put(action(ActionTypes.RECEIVED_RECORD, response.data));
}

export function* watchRecord() {
    yield take(ActionTypes.GET_RECORD);
    yield fork(getRecord);
}
