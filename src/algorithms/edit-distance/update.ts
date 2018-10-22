import { State, Point } from '../../store/State';
import { addHelperStyles } from './index';

// import { watchRecord } from '../../store/edit-distance/sagas';

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

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

const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point =>
    (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };

const update = (value: number, state: State): State => {

    const { currentPoint, errors, success } = state;

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const tableMatrix = updateTable(state.tableMatrix, currentPoint, value);
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        addHelperStyles(tableStyles, currentPoint);
        return { ...state, steps, errors: errors + 1, tableMatrix, tableStyles };
    }

    if (isLastCell(tableMatrix, currentPoint)) {
        return { ...state, steps, tableMatrix, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(tableMatrix, currentPoint);
    tableMatrix[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint);

    return { ...state, steps, tableMatrix, tableStyles, currentPoint: nextPoint };
};

export default update;
