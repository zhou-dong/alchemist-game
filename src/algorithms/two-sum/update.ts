import { Point } from '../../store/BasicState';
import { State } from "../../store/two-sum/state";
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const isCorrect = ({ col }: Point, results: number[], value: string): boolean => {


    if (col === Math.max(...results) + 1 && value.toLowerCase() === "gotcha") {
        return true;
    }

    if (col < Math.max(...results) + 1 && value.toLowerCase().includes("add")) {
        return true;
    }

    return false;
};

const isLastCell = ({ col }: Point, results: number[]): boolean => {
    return col === Math.max(...results) + 1;
};

const update = (value: string, state: State): State => {

    const { currentPoint, errors, success } = state;

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const table = state.table;
    const tableStyles = newTableStyles(state.tableStyles);

    if (!isCorrect(currentPoint, state.results, value)) {
        addHelperStyles(tableStyles, currentPoint);
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(currentPoint, state.results)) {
        const finishTime = new Date().getTime();
        tableStyles[0][0] = { backgroundColor: "lightgray" };
        tableStyles[1][0] = { backgroundColor: "lightgray" };

        state.results.forEach(result => {
            tableStyles[0][result + 1] = helperStyle;
        });

        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = { row: currentPoint.row, col: currentPoint.col + 1 };
    addHelperStyles(tableStyles, nextPoint);

    return { ...state, steps, startTime, tableStyles, currentPoint: nextPoint };
};

export default update;
