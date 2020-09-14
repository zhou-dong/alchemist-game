import { call, put, take, fork } from 'redux-saga/effects';
import axios from 'axios';

import  { GET_RECORD } from './constants';
import { fetchSuccess } from './actions';
import { basicInfo } from './initialState';

function* getRecord() {
    const response = yield call(axios.get, `/record/algorithm/${basicInfo.id}`);
    yield put(fetchSuccess(response.data));
}

export function* watchRecord() {
    yield take(GET_RECORD);
    yield fork(getRecord);
}
