import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const getLastCell = (table: (string | number)[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] => {
    const cloned = [...table];
    cloned[1][point.col] = value;
    return cloned;
};

const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean => {
    return (comparedTable[row - 1][col - 1] !== value);
}

const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const { row, col } = getLastCell(table);
    return row === 1 && point.col === col;
};

const getNextPoint = ({ row, col }: Point, inputArray: number[]): Point => {

    const length = inputArray[row - 1];

    const lastCol = row - 1 + length + 1;
    if (col === inputArray.length) {
        return { row: row + 1, col: row + 2 };
    }

    if (col === lastCol) {
        return { row: row + 1, col: row + 2 };
    } else {
        return { row, col: col + 1 };
    }
};

const update = (value: number, state: State): State => {

    const { currentPoint, errors, success, other } = state;

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const table = updateTable(state.table, currentPoint, value);
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        tableStyles[1][currentPoint.col] = { backgroundColor: 'red' };
        addHelperStyles(tableStyles, currentPoint, state.table);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        const lastCell = getLastCell(table);
        tableStyles[lastCell.row][lastCell.col] = helperStyle;
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const inputArray: number[] = other;
    const nextPoint = getNextPoint(currentPoint, inputArray);

    tableStyles[1][nextPoint.col] = helperStyle;
    addHelperStyles(tableStyles, nextPoint, table);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
