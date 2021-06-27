import update from '../../algorithms/trapping-rain-water/update';
import { Reducer } from 'redux';
import * as Constants from './constants';
import { create } from './initialState';
import { State } from './state';
import { Action } from './actions';

const reducer: Reducer<State> = (state: State = create(), action: Action) => {
    switch (action.type) {
        case Constants.BUTTON_CLICK:
            return update(Number(action.payload), state);
        case Constants.OPEN_DIALOG_CLICK:
            return { ...state, dialogOpen: true };
        case Constants.CLOSE_DIALOG_CLICK:
            return { ...state, dialogOpen: false };
        case Constants.OPEN_FORMULA_CLICK:
            return { ...state, formulaOpen: true };
        case Constants.CLOSE_FORMULA_CLICK:
            return { ...state, formulaOpen: false };
        case Constants.REFRESH_CLICK:
            return create();
        case Constants.RECEIVED_RECORD:
            return { ...state, loading: false, count: action.payload || 0 };
        default:
            return state;
    }
};

export default reducer;
