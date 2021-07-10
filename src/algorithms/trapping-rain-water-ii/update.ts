import { State } from "../../store/trapping-rain-water-ii/state";

const isSuccess = (value: string, { currentPoint, guiders }: State): boolean => {
    const { col } = currentPoint;
    const { directions } = guiders;
    return (value.trim() === "--->" && directions[col] === 0) || (value.trim() === "<---" && directions[col] === 1);
};

const update = (value: string, state: State): State => {

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();
    const { currentPoint, errors, success, guiders } = state;
    const { row, col } = currentPoint;
    const { directions } = guiders;
    const steps = state.steps + 1;

    if (success) {
        return state;
    }

    if (!isSuccess(value, state)) {
        return { ...state, startTime, steps, errors: errors + 1 };
    }

    if (col >= directions.length - 1) {
        const finishTime = new Date().getTime();
        return { ...state, finishTime, success: true, currentPoint: { row, col: col + 1 } };
    }

    return { ...state, steps, startTime, currentPoint: { row, col: col + 1 } };
};

export default update;
