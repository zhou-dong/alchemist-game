import { createDPTable, createMarksTable } from './algorithm';
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

const createTableMatrix = (sequence: string): (boolean | string)[][] => {
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

    table[0][0] = '1';
    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedMarksTable = (sequence: string): number[][] => {
    const dpTable = createDPTable(sequence);
    const marksTable = createMarksTable(sequence, dpTable);
    const { rows, cols } = getTableSize(sequence);
    const table: number[][] = Array(rows).fill(1).map(() => Array(cols).fill(1));
    for (let row = 2; row < rows; row++) {
        for (let col = 2; col < cols; col++) {
            table[row][col] = marksTable[row - 2][col - 2];
        }
    }
    return table;
};

const createComparedTable = (sequence: string): (boolean | string)[][] => {
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
    nextPoint: Point,
    nextLength: number,
    table: (string | boolean)[][]
): void => {
    for (let i = row; i <= col; i++) {
        styles[0][i] = helperStyleSecondary;
        styles[1][i] = helperStyle;

        styles[i][0] = helperStyleSecondary;
        styles[i][1] = helperStyle;
    }

    const nextRow = nextPoint.row;
    const nextCol = nextPoint.col;
    if (nextLength > 2 && table[1][nextRow] === table[1][nextRow + nextLength - 1]) {
        styles[1][nextCol] = helperStyleThird;
        styles[1][nextRow] = helperStyleThird;
        styles[nextRow + 1][nextRow + nextLength - 2] = helperStyleThird;
    }

};

const createTableStyles = (sequence: string): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(sequence);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint, { row: 3, col: 3 }, 1, []);
    return table;
};

const createButtons = (): boolean[] => [true, false];

const createButtonsStyles = (): (React.CSSProperties)[] => createButtons().map(() => ({ color: 'back' }));

export {
    addHelperStyles,
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
    createComparedMarksTable,
};
