import { Action as ReduxAction } from 'redux';

export const enum ActionType {
    BUTTON_CLICK,
    OPEN_MODAL_CLICK,
    CLOSE_MODAL_CLICK,
    REFRESH_CLICK,
    GET_SUCCESS_COUNT,
    RECEIVED_SUCCESS_COUNT,
}

export interface Action extends ReduxAction<ActionType> {
    type: ActionType;
}

export interface ActionWithPayload<P> extends Action {
    payload: P
}

export function createAction(type: ActionType): Action
export function createAction<P>(type: ActionType, payload: P): ActionWithPayload<P>
export function createAction<P>(type: ActionType, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}

export const Actions = {
    refresh: () => createAction(ActionType.REFRESH_CLICK),
    closeModal: () => createAction(ActionType.CLOSE_MODAL_CLICK),
    openModal: () => createAction(ActionType.OPEN_MODAL_CLICK),
    buttonClick: (value: number | string) => createAction(ActionType.BUTTON_CLICK, value),
};
