import { Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { State } from '../../store/longest-palindromic-subsequence/state';
import { helperStyle } from '../../pages/withRoot';

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

const isLastCell = (table: (string | number)[][], { row, col }: Point): boolean => {
    return row === 2 && col === table[row].length - 1;
};

const getNext = (table: (string | number)[][], { row, col }: Point, length: number) => {
    const isNextLen = row + length === table.length;
    const nextLength = isNextLen ? length + 1 : length;
    const nextRow = isNextLen ? 2 : row + 1;
    const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;
    return { row: nextRow, col: nextCol, length: nextLength };
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
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        addHelperStyles(tableStyles, currentPoint, state.length, table);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        tableStyles[2][tableStyles[2].length - 1] = helperStyle;
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const next = getNext(table, currentPoint, state.length);
    const nextPoint = { row: next.row, col: next.col };
    table[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint, next.length, table);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint, length: next.length };
};

export default update;
