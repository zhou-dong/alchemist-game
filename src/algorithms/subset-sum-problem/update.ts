import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const getLastCell = (table: (string | boolean)[][]): Point => {
    const row = table.length - 1;
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

const isLastCell = (table: (string | boolean)[][], point: Point): boolean => {
    const { row, col } = getLastCell(table);
    return isMatch(point, row, col);
};

const getNextPoint = (table: (string | boolean)[][], { row, col }: Point): Point =>
    (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };

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
        addHelperStyles(tableStyles, currentPoint, table);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        const lastCell = getLastCell(table);
        tableStyles[lastCell.row][lastCell.col] = helperStyle;
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(table, currentPoint);
    table[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint, table);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
