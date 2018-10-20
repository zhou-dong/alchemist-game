import { Reducer } from 'redux';
import { State, ActionTypes } from './types';
import initialState from './initialState';

const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BUTTON_CLICK:
            // return updateSteps(state, action);
            return state;
        case ActionTypes.OPEN_MODAL_CLICK:
            return { ...state, showModal: true };
        case ActionTypes.CLOSE_MODAL_CLICK:
            return { ...state, showModal: false };
        case ActionTypes.REFRESH_CLICK:
            return initialState;
        case ActionTypes.RECEIVED_RECORD:
            const count = action.payload || 0;
            return { ...state, count };
        default:
            return state;
    }
};

export default reducer;
