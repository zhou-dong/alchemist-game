import { Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { State } from '../../store/longest-palindromic-substring/state';
import { helperStyle } from '../../pages/withRoot';

const getValue = (value: boolean) => value ? 'T' : 'F';

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | boolean)[][], point: Point, value: boolean): (string | boolean)[][] => {
    const result: (string | boolean)[][] = table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? getValue(value) : cell);
    });
    return result;
};

const nonCorrect = (comparedTable: (string | boolean)[][], { row, col }: Point, value: boolean): boolean =>
    (comparedTable[row][col] !== value);

const isLastCell = (table: (string | boolean)[][], { row, col }: Point): boolean => {
    return row === 2 && col === table[row].length - 1;
};

const getNext = (table: (string | boolean)[][], { row, col }: Point, length: number) => {
    const isNextLen = row + length === table.length;
    const nextLength = isNextLen ? length + 1 : length;
    const nextRow = isNextLen ? 2 : row + 1;
    const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;

    return { row: nextRow, col: nextCol, length: nextLength };
};

const update = (value: boolean, state: State): State => {

    const { currentPoint, errors, success } = state;

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const table = updateTable(state.table, currentPoint, value);
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        addHelperStyles(tableStyles, currentPoint, currentPoint, state.length, table);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    table[0][0] = state.marksTable[currentPoint.row][currentPoint.col] + '';
    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        tableStyles[0][0] = helperStyle;
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const next = getNext(table, currentPoint, state.length);
    const nextPoint = { row: next.row, col: next.col };
    table[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint, nextPoint, next.length, table);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint, length: next.length };
};

export default update;
