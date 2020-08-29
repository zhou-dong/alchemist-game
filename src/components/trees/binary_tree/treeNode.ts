export enum Status {
    INITIAL,
    ACTIVATED,
    PRINTED,
    FINISHED,
}

export default interface Props {
    index: number;
    status: Status;

    circleCx: number;
    circleCy: number;
    circleR: number;

    content: string;
    textX: number;
    textY: number;

    parent?: Props;
    left?: Props;
    right?: Props;

    goLeftEnabled: boolean;
    goRightEnabled: boolean;
    printValEnabled: boolean;
    returnToParentEnabled: boolean;
}
