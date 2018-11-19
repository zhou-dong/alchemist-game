import { Point } from '../../store/BasicState';
import { State } from '../../store/word-break/state';
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const getLastPoint = (table: (string | boolean)[][]): Point => {
    const row = 2;
    const col = table[row].length - 1;
    return { row, col };
};

const booleanToString = (value: boolean): string => (value ? 'T' : 'F');

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | boolean)[][], point: Point, value: boolean): (string | boolean)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? booleanToString(value) : cell);
    });

const nonCorrect = (comparedTable: (string | boolean)[][], { row, col }: Point, value: boolean): boolean =>
    (comparedTable[row][col] !== value);

const isLastCell = (table: (string | boolean)[][], { row, col }: Point): boolean => {
    return row === 2 && col === table[2].length - 1;
};

const createNextCol = (col: number, len: number, table: (string | boolean)[][]): number => {
    const nextCol = (col + 1) % table.length;
    return nextCol < 2 ? 1 + len : nextCol;
};

const getNextPoint = (table: (string | boolean)[][], { row, col }: Point, length: number) => {
    const nextRow = col + 1 === table.length ? 2 : row + 1;
    const nextLen = col + 1 === table.length ? length + 1 : length;
    const nextCol = createNextCol(col, nextLen, table);
    return { row: nextRow, col: nextCol, length: nextLen };
};

const update = (value: boolean, state: State): State => {

    const { currentPoint, errors, success, length } = state;

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const table = updateTable(state.table, currentPoint, value);
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        addHelperStyles(tableStyles, currentPoint);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const lastPoint = getLastPoint(table);
        tableStyles[lastPoint.row][lastPoint.col] = helperStyle;
        const finishTime = new Date().getTime();
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const next = getNextPoint(table, currentPoint, length);
    const point = { row: next.row, col: next.col };

    table[next.row][next.col] = '?';
    addHelperStyles(tableStyles, point);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: point, length: next.length };
};

export default update;
