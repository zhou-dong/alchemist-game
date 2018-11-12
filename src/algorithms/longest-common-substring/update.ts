import { State, Point } from '../../store/BasicState';
import { addHelperStyles } from '.';
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

const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return isMatch(point, row, col);
};

const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point => {
    return (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };
};

const getMax = (table: (string |number)[][]): number => {
    let max = 0;
    for (let row = 1; row < table.length; row++) {
        for (let col = 1; col < table[row].length; col++) {
            max = Math.max(max, Number(table[row][col]));
        }
    }
    return max;
};

const successTableStyle = (state: State): React.CSSProperties[][] => {
    const newSyles = newTableStyles(state.tableStyles);
    const table = state.comparedTable;
    const max = getMax(table);
    for (let row = 2; row < table.length; row++) {
        for (let col = 2; col < table[row].length; col++) {
            if (table[row][col] === max) {
                newSyles[row][col] = helperStyle;
            }
        }
    }
    return newSyles;
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
        addHelperStyles(tableStyles, currentPoint);
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        const successStyles = successTableStyle(state);
        return { ...state, startTime, finishTime, steps, table, tableStyles: successStyles, success: true };
    }

    const nextPoint = getNextPoint(table, currentPoint);
    table[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint };
};

export default update;
