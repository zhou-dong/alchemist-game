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

export interface BasicInfo {
    readonly id: number;
    readonly title: string;
}

export interface Dialog extends BasicInfo {
    readonly dialogOpen: boolean;
    readonly dialogCroll: DialogScroll;
    readonly formula: string;
    readonly example: string;
    readonly useCases: string;
    readonly description: string;
    readonly handleDialogOnClose?: () => any;
    readonly handleCloseDialogClick: () => Action;
}

export interface Header extends BasicInfo {
    readonly success: boolean;
    readonly loading: boolean;
    readonly steps: number;
    readonly errors: number;
    readonly title: string;
    readonly startTime: number;
    readonly finishTime: number;
    readonly difficulty: string;
    readonly handleRefreshClick: () => Action;
    readonly handleOpenDialogClick: () => Action;
}

export interface Table {
    readonly table: Array<Array<number | string>>;
    readonly tableStyles: Array<Array<React.CSSProperties>>;
}

export interface Buttons {
    readonly buttons: Array<number | string>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly handleButtonClick: (data: number | string) => Action;
}

export interface State extends Dialog, Header, Table, Buttons {
    readonly currentPoint: Point;
    readonly comparedTable: Array<Array<number | string>>;
    readonly increaseSuccessRecord?: () => Action;
}
