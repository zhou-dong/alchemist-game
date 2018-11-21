import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary, helperStyleThird } from '../../pages/withRoot';

const startPoint: Point = {
    row: 2,
    col: 2,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (sequence: string): TableSize => {
    const rows = sequence.length + 2;
    const cols = sequence.length + 2;
    return { rows, cols };
};

const createTableMatrix = (sequence: string): (number | string)[][] => {
    const { rows, cols } = getTableSize(sequence);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = col - 2;
        table[1][col] = sequence.charAt(col - 2);
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = row - 2;
        table[row][1] = sequence.charAt(row - 2);
    }

    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (sequence: string): (number | string)[][] => {
    const { rows, cols } = getTableSize(sequence);

    const dpTable = createDPTable(sequence);
    const tableMatrix = createTableMatrix(sequence);

    for (let row = 2; row < rows; row++) {
        for (let col = 2; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 2][col - 2];
        }
    }

    return tableMatrix;
};

const addHelperStyles = (
    styles: React.CSSProperties[][],
    { row, col }: Point,
    nextLength: number,
    table: (string | number)[][]
): void => {
    for (let i = row; i <= col; i++) {
        styles[0][i] = helperStyleSecondary;
        styles[1][i] = helperStyle;

        styles[i][0] = helperStyleSecondary;
        styles[i][1] = helperStyle;
    }

    if (nextLength === 2 && table[1][row] === table[1][row + nextLength - 1]) {
        styles[1][col] = helperStyleThird;
        styles[1][row] = helperStyleThird;

        styles[col][1] = helperStyleThird;
        styles[row][1] = helperStyleThird;
    }
};

const createTableStyles = (sequence: string): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(sequence);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint, 1, []);
    return table;
};

const createButtons = (sequence: string): number[] => {
    const dpTable = createDPTable(sequence);
    const set = new Set<number>();
    for (let row = 0; row < dpTable.length; row++) {
        for (let col = 0; col < dpTable[row].length; col++) {
            set.add(dpTable[row][col]);
        }
    }
    return Array.from(set).sort();
};

const createButtonsStyles = (sequence: string): (React.CSSProperties)[] => {
    return createButtons(sequence).map(() => ({ color: 'back' }));
};

export {
    addHelperStyles,
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
};
