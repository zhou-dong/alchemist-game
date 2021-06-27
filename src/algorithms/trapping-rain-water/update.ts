import { Point } from '../../store/BasicState';
import { State } from "../../store/trapping-rain-water/state";

const nonCorrect = (state: State, value: number): boolean => {
    const { row, col } = state.currentPoint;
    if (row === 0) {
        return state.leftMax[col] !== value;
    } else if (row === 1) {
        return state.rightMax[col] !== value;
    } else {
        return state.water[col] !== value;
    }
};

const isLastCell = (state: State): boolean => {
    const { row, col } = state.currentPoint;
    return row === 2 && col === state.water.length;
};

const getNextPoint = ({ row, col }: Point, cols: number): Point => {
    if (row === 0) {
        if (col >= cols - 1) {
            return { row: 1, col: cols - 1 };
        } else {
            return { row: 0, col: col + 1 };
        }
    } else if (row === 1) {
        if (col === 0) {
            return { row: 2, col: 0 };
        } else {
            return { row: 1, col: col - 1 };
        }
    } else {
        return { row, col: col + 1 };
    }
};

const update = (value: number, state: State): State => {
    const { currentPoint, errors, success } = state;
    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;

    if (isLastCell(state)) {
        const finishTime = new Date().getTime();
        return { ...state, startTime, finishTime, success: true };
    }


    if (nonCorrect(state, value)) {
        return { ...state, startTime, steps, errors: errors + 1 };
    }

    const nextPoint = getNextPoint(currentPoint, state.water.length);
    return { ...state, steps, startTime, currentPoint: nextPoint };
};

export default update;
