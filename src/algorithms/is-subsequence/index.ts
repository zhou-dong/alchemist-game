import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle } from '../../pages/withRoot';

const startPoint: Point = {
    row: 2,
    col: 2,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (stringOne: string, stringTwo: string): TableSize => {
    const rows = stringTwo.length + 2;
    const cols = stringOne.length + 2;
    return { rows, cols };
};

const createTableMatrix = (stringOne: string, stringTwo: string): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(stringOne, stringTwo);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = stringOne.charAt(col - 2);
        table[1][col] = 'T';
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = stringTwo.charAt(row - 2);
        table[row][1] = 'F';
    }

    table[1][1] = 'T';
    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (stringOne: string, stringTwo: string): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(stringOne, stringTwo);

    const dpTable = createDPTable(stringOne, stringTwo);
    const tableMatrix = createTableMatrix(stringOne, stringTwo);

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 1][col - 1];
        }
    }
    return tableMatrix;
};

const addHelperStyles = (styles: React.CSSProperties[][], point: Point): void => {
    for (let col = 0; col < styles[0].length && col <= point.col; col++) {
        styles[0][col] = helperStyle;
    }

    for (let row = 0; row < styles.length && row <= point.row; row++) {
        styles[row][0] = helperStyle;
    }
};

const createTableStyles = (stringOne: string, stringTwo: string): (React.CSSProperties)[][] => {
    const rows = stringTwo.length + 2;
    const cols = stringOne.length + 2;
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (stringOne: string, stringTwo: string): boolean[] => [true, false];

const createButtonsStyles = (stringOne: string, stringTwo: string): (React.CSSProperties)[] => {
    return createButtons(stringOne, stringTwo).map(() => ({ color: 'back' }));
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
