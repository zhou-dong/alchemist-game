import { State } from "../../store/trapping-rain-water-ii/state";

const update = (value: string, state: State): State => {

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();
    const { currentPoint, errors, success, guiders } = state;
    const { row, col } = currentPoint;
    const { directions } = guiders;
    const steps = state.steps + 1;

    if (success) {
        return state;
    }

    console.log(col, directions.length);

    if (col >= directions.length) {
        const finishTime = new Date().getTime();
        return { ...state, finishTime, success: true };
    }

    if (col >= directions.length) {
        const finishTime = new Date().getTime();
        return { ...state, finishTime, success: true };
    }

    if (value.trim() === "--->" && directions[col] === 0) {
        return { ...state, steps, startTime, currentPoint: { row, col: col + 1 } };
    } else if (value.trim() === "<---" && directions[col] === 1) {
        return { ...state, steps, startTime, currentPoint: { row, col: col + 1 } };
    } else {
        return { ...state, startTime, steps, errors: errors + 1 };
    }
};

export default update;
