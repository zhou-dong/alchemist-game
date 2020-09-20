import { Point } from '../../store/BasicState';
import { State } from '../../store/egg-dropping-problem/state';
import { addHelperStyles } from '.';

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

    const startTime: number = (state.startTime) ? state.startTime : new Date().getTime();

    if (success) {
        return state;
    }

    const steps = state.steps + 1;
    const table = updateTable(state.table, currentPoint, value);
    const tableStyles = newTableStyles(state.tableStyles);

    if (nonCorrect(state.comparedTable, currentPoint, value)) {
        addHelperStyles(tableStyles, currentPoint);
        tableStyles[currentPoint.row][currentPoint.col] = { backgroundColor: 'red' };
        return { ...state, startTime, steps, errors: errors + 1, table, tableStyles };
    }

    if (isLastCell(table, currentPoint)) {
        const finishTime = new Date().getTime();
        addHelperStyles(tableStyles, currentPoint);
        return { ...state, startTime, finishTime, steps, table, tableStyles, success: true };
    }

    const nextPoint = getNextPoint(table, currentPoint);

    table[nextPoint.row][nextPoint.col] = '?';
    addHelperStyles(tableStyles, nextPoint);

    return { ...state, steps, startTime, table, tableStyles, currentPoint: nextPoint, ...createHelperTable(nextPoint, state) };
};

interface Helpers {
    helperTable: (string | number)[][];
    resultsInDifferentFloors: number[];
}

const createHelperTable = (point: Point, { comparedTable }: State): Helpers => {

    const eggs = point.row;
    const floors = point.col - 1;

    let helperTable: (string | number)[][] = [];
    let resultsInDifferentFloors: number[] = [];

    if (eggs > floors) {
        return { helperTable, resultsInDifferentFloors };
    } else {
        for (let floor = 1; floor <= floors; floor++) {

            const row: (string | number)[] = [];
            // floor number
            row.push(floor);

            const breaks = comparedTable[eggs - 1][floor];
            const nonBreaks = comparedTable[eggs][floors - floor + 1];

            // breaks
            row.push(`Eggs-1 = ${eggs}-1 = ${eggs - 1}`);
            row.push(`Floor-1 = ${floor}-1 = ${floor - 1}`);
            row.push(`T[${eggs - 1}][${floor - 1}] = ${breaks}`);

            // non-breaks
            row.push(`Eggs = ${eggs}`);
            row.push(`Floors-Floor = ${floors}-${floor} = ${floors - floor}`);
            row.push(`T[${eggs}][${floors - floor}] = ${nonBreaks}`);

            // result
            // row.push(`1+ Max(Breaks, NonBreaks)`);
            row.push(`1 + Max(${breaks}, ${nonBreaks}) = ${1 + Math.max(breaks, nonBreaks)}`);
            resultsInDifferentFloors.push(1 + Math.max(breaks, nonBreaks));

            helperTable.push(row);
        }
    }

    return { helperTable, resultsInDifferentFloors };
};

export default update;
