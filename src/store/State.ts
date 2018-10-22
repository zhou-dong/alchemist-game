export interface Point {
    readonly row: number;
    readonly col: number;
}

export interface Modal {
    show: boolean;
    title: string;
    introduction: string;
    formula: string;
    examples: Array<string>;
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
    readonly modal?: Modal;
    readonly currentPoint: Point;

    readonly comparedTable: Array<Array<number | string>>;
    readonly tableMatrix: Array<Array<number | string>>;
    readonly tableStyles: Array<Array<React.CSSProperties>>;
    readonly buttons: Array<number | string>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly handleButtonClick?: (data: number | string) => any;
    readonly handleRefreshClick?: () => any;
    readonly increaseSuccessRecord?: () => any;
}
