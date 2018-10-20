import { ActionWithPayload as Action, ActionType } from './Action';
import { State } from './State';

export const createReducer = (initialState: State, updateSteps: (state: State, action: Action<any>) => State) => {

    const reducer = (state: State = initialState, action: Action<any>) => {
        switch (action.type) {
            case ActionType.BUTTON_CLICK:
                return updateSteps(state, action);
            case ActionType.OPEN_MODAL_CLICK:
                return { ...state, showModal: true };
            case ActionType.CLOSE_MODAL_CLICK:
                return { ...state, showModal: false };
            case ActionType.REFRESH_CLICK:
                return initialState;
            case ActionType.RECEIVED_SUCCESS_COUNT:
                const count = action.payload || 0;
                return { ...state, count };
            default:
                return state;
        }
    };

    return reducer;
}
