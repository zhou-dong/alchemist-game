import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const booleanToString = (value: boolean): string => (value ? 'T' : 'F');

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | boolean)[][], point: Point, value: boolean): (string | boolean)[][] => {
    return table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? booleanToString(value) : cell);
    });
};

const nonCorrect = (comparedTable: (string | boolean)[][], { row, col }: Point, value: boolean): boolean => {
    return comparedTable[row][col] !== value;
};

const isLastRow = (table: (string | boolean)[][], point: Point): boolean => {
    return point.row === table.length - 1;
};

const isLastCell = (table: (string | boolean)[][], point: Point): boolean => {
    if (!isLastRow(table, point)) {
        return false;
    }

    return table[point.row][point.col] === true || table[point.row][point.col] === 'T';
};

const getNextPoint = (table: (string | boolean)[][], { row, col }: Point): Point => {
    return (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };
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
        addHelperStyles(tableStyles, currentPoint, table);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        tableStyles[currentPoint.row][currentPoint.col] = helperStyle;
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(table, currentPoint);
    table[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint, table);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
