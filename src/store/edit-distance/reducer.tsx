import { Reducer } from 'redux';
import { State, ActionTypes } from './types';

const initialState: State = {
    id: 1,
    success: true,
    loading: true,
    steps: 20,
    errors: 10,
    title: 'Edit Distance',
    subHeader: 'Hard',
    tableMatrix: [
        ['a', 'b', 'c', 'd', 'e'],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
    ],
    tableStyles: [
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
    ],
    buttonsArray: ['a', 1, 2, 3, 4],
    buttonsStyles:
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
    buttonsHandleClick: (data: number | string) => alert(data),
}

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
        case ActionTypes.RECEIVED_SUCCESS_COUNT:
            const count = action.payload || 0;
            return { ...state, count };
        default:
            return state;
    }
}

export default reducer;
