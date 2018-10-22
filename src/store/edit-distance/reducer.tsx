import { Reducer } from 'redux';
import { ActionTypes } from './types';
import { State } from '../State';
import initialState from './initialState';
import update from '../../algorithms/edit-distance/update';

const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BUTTON_CLICK:
            return update(Number(action.payload), state);
        case ActionTypes.OPEN_MODAL_CLICK:
            return { ...state, showModal: true };
        case ActionTypes.CLOSE_MODAL_CLICK:
            return { ...state, showModal: false };
        case ActionTypes.REFRESH_CLICK:
            return initialState;
        case ActionTypes.RECEIVED_RECORD:
            return { ...state, loading: false, count: action.payload || 0 };
        default:
            return state;
    }
};

export default reducer;
