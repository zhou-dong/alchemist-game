import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const isMatch = (point: Point, r: number, c: number) => (r === 1 && point.col === c);

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: number[][], point: Point, value: number): number[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

const nonCorrect = (comparedTable: number[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

const isLastCell = (table: number[][], { row, col }: Point): boolean => {
    return row === table.length - 1 && col === table[row].length - 1;
};

const setSuccessStyle = (table: number[][], styles: React.CSSProperties[][]): void => {
    const max = Math.max(...table[1]);
    for (let col = 0; col < table[1].length; col++) {
        if (table[1][col] === max) {
            styles[1][col] = helperStyle;
        }
    }
};

const getNextPoint = ({ row, col }: Point): Point => {
    if (col === row) {
        return { row: 1, col: col + 1 };
    } else {
        return { row: row + 1, col };
    }
};

const update = (value: number, state: State): State => {
    const { currentPoint, errors, success } = state;

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const table = updateTable(state.table, currentPoint, value);
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        addHelperStyles(tableStyles, currentPoint);
        tableStyles[1][currentPoint.col] = { backgroundColor: 'red' };
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(state.comparedTable, currentPoint)) {
        const finishTime = new Date().getTime();
        setSuccessStyle(table, tableStyles);
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(currentPoint);

    addHelperStyles(tableStyles, nextPoint);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
