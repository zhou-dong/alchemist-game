import { Action } from 'redux';

export interface Point {
    readonly row: number;
    readonly col: number;
}

export enum DialogScroll {
    Paper = 'paper',
    Body = 'body',
}

export interface Modal {
    open: boolean;
    title: string;
    scroll: DialogScroll;
    content: string;
    formula: string;
    examples: Array<string>;
    handleClose: () => Action;
}

export enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export interface State {
    readonly id: number;
    readonly success: boolean;
    readonly loading: boolean;
    readonly steps: number;
    readonly errors: number;
    readonly title: string;
    readonly time: number;

    readonly difficulty: Difficulty;
    readonly modal: Modal;
    readonly currentPoint: Point;

    readonly comparedTable: Array<Array<number | string>>;
    readonly tableMatrix: Array<Array<number | string>>;
    readonly tableStyles: Array<Array<React.CSSProperties>>;
    readonly buttons: Array<number | string>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly handleButtonClick: (data: number | string) => Action;
    readonly handleRefreshClick: () => Action;
    readonly increaseSuccessRecord?: () => Action;
}
