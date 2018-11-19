import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
import { helperStyle } from '../../pages/withRoot';

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

const getLastPoint = (table: any[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

const newTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return isMatch(point, row, col);
};

const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point => {
    if (row === 0) {
        if (col === table[0].length - 1) {
            return { row: 1, col: 0 };
        } else {
            return { row, col: col + 1 };
        }
    } else if (row !== 0 && col === 0) {
        if (row === table.length - 1) {
            return { row: 1, col: 1 };
        } else {
            return { row: row + 1, col };
        }
    } else {
        if (col === table[row].length - 1) {
            return { row: row + 1, col: 1 };
        } else {
            return { row, col: col + 1 };
        }
    }
};

const update = (value: number, state: State): State => {

    const { currentPoint, errors, success } = state;

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        addHelperStyles(tableStyles, currentPoint);
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        return { ...state, startTime, steps, errors: errors + 1, tableStyles };
    }

    const table = updateTable(state.table, currentPoint, value);

    if (isLastCell(table, currentPoint)) {
        const { row, col } = getLastPoint(tableStyles);
        tableStyles[row][col] = helperStyle;
        const finishTime = new Date().getTime();
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(table, currentPoint);
    addHelperStyles(tableStyles, nextPoint);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
