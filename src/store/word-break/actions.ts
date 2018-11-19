import * as constants from './constants';

export interface Refresh {
    type: constants.REFRESH_CLICK;
}

export interface ButtonClick {
    type: constants.BUTTON_CLICK;
    payload: any;
}

export interface FetchSuccess {
    type: constants.RECEIVED_RECORD;
    payload: any;
}

export interface IncreaseSuccess {
    type: constants.INCREASE_RECORD;
}

export interface CloseDialog {
    type: constants.CLOSE_DIALOG_CLICK;
}

export interface OpenDialog {
    type: constants.OPEN_DIALOG_CLICK;
}

export interface CloseFormula {
    type: constants.CLOSE_FORMULA_CLICK;
}

export interface OpenFormula {
    type: constants.OPEN_FORMULA_CLICK;
}

export type Action = Refresh | ButtonClick | FetchSuccess | IncreaseSuccess |
    CloseDialog | OpenDialog | CloseFormula | OpenFormula;

export function refresh(): Refresh {
    return { type: constants.REFRESH_CLICK };
}

export function buttonClick(data: any): ButtonClick {
    return { type: constants.BUTTON_CLICK, payload: data };
}

export function fetchSuccess(data: any): FetchSuccess {
    return { type: constants.RECEIVED_RECORD, payload: data };
}

export function increaseSuccess(): IncreaseSuccess {
    return { type: constants.INCREASE_RECORD };
}

export function closeDialog(): CloseDialog {
    return { type: constants.CLOSE_DIALOG_CLICK };
}

export function openDialog(): OpenDialog {
    return { type: constants.OPEN_DIALOG_CLICK };
}

export function closeFormula(): CloseFormula {
    return { type: constants.CLOSE_FORMULA_CLICK };
}

export function openFormula(): OpenFormula {
    return { type: constants.OPEN_FORMULA_CLICK };
}
