import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';

const max = Number.MAX_SAFE_INTEGER;

const isMatch = ({ row, col }: Point, r: number, c: number) => {
    return (r === 2 && col + 1 === c);
};

const getValue = (value: number) => (value === max) ? 'x' : value;

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? getValue(value) : cell);
    });

const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

const isLastCell = (table: (string | number)[][], { row, col }: Point): boolean => {
    const colLength = table[1].length;
    return row === colLength - 3 && col === colLength - 2;
};

const getNextPoint = ({ row, col }: Point): Point => {
    if (row + 1 === col) {
        return { row: 0, col: col + 1 };
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
        addHelperStyles(tableStyles, currentPoint, table);
        tableStyles[2][currentPoint.col + 1] = { backgroundColor: 'red' };
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(currentPoint);
    if (!table[2][nextPoint.col]) {
        table[2][nextPoint.col] = '?';
    }
    addHelperStyles(tableStyles, nextPoint, table);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
