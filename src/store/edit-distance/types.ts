export interface State {
    readonly id: number;
    readonly success: boolean;
    readonly loading: boolean;
    readonly steps: number;
    readonly errors: number;
    readonly title: string;
    readonly subHeader: string;
    readonly tableMatrix: Array<Array<number | string>>;
    readonly tableStyles: Array<Array<React.CSSProperties>>;
    readonly buttonsArray: Array<number | string>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly buttonsHandleClick: (data: number | string) => any;
}

export const enum ActionTypes {
    BUTTON_CLICK = '@@EDIT_DISTANCE/BUTTON_CLICK',
    OPEN_MODAL_CLICK = '@@EDIT_DISTANCE/OPEN_MODAL_CLICK',
    CLOSE_MODAL_CLICK = '@@EDIT_DISTANCE/CLOSE_MODAL_CLICK',
    REFRESH_CLICK = '@@EDIT_DISTANCE/REFRESH_CLICK',
    GET_RECORD = '@@EDIT_DISTANCE/GET_SUCCESS_COUNT',
    RECEIVED_RECORD = '@@EDIT_DISTANCE/RECEIVED_SUCCESS_COUNT',
}
