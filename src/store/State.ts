import { Action } from 'redux';

export interface Point {
    readonly row: number;
    readonly col: number;
}

export enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export enum DialogScroll {
    Paper = 'paper',
    Body = 'body',
}

export interface Core {
    // TODO
}

export interface Dialog {
    readonly dialogOpen: boolean;
    readonly title: string;
    readonly dialogCroll: DialogScroll;
    readonly dialogContent: string;
    readonly formula: string;
    readonly examples: Array<string>;
    readonly handleDialogOnClose: () => any;
    readonly handleCloseDialogClick: () => Action;
}

export interface Header {
    readonly success: boolean;
    readonly loading: boolean;
    readonly steps: number;
    readonly errors: number;
    readonly title: string;
    readonly time: number;
    readonly difficulty: string;
    readonly handleRefreshClick: () => Action;
    readonly handleOpenDialogClick: () => Action;
}

export interface State extends Dialog, Header {
    readonly id: number;
    readonly currentPoint: Point;
    readonly comparedTable: Array<Array<number | string>>;
    readonly tableMatrix: Array<Array<number | string>>;
    readonly tableStyles: Array<Array<React.CSSProperties>>;
    readonly buttons: Array<number | string>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly handleButtonClick: (data: number | string) => Action; 
    readonly increaseSuccessRecord?: () => Action;
}
