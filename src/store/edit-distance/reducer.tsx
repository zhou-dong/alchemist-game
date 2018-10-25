import update from '../../algorithms/edit-distance/update';
import { Reducer } from 'redux';
import { ActionTypes } from './types';
import { create } from './initialState';
import { State } from '../BasicState';

const reducer: Reducer<State> = (state: State = create(), action) => {
    switch (action.type) {
        case ActionTypes.BUTTON_CLICK:
            return update(Number(action.payload), state);
        case ActionTypes.OPEN_DIALOG_CLICK:
            return { ...state, dialogOpen: true };
        case ActionTypes.CLOSE_DIALOG_CLICK:
            return { ...state, dialogOpen: false };
        case ActionTypes.REFRESH_CLICK:
            return create();
        case ActionTypes.RECEIVED_RECORD:
            return { ...state, loading: false, count: action.payload || 0 };
        default:
            return state;
    }
};

export default reducer;
