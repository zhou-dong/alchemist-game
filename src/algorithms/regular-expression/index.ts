import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle } from '../../pages/withRoot';

const startPoint: Point = {
    row: 1,
    col: 2,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (pattern: string, text: string): TableSize => {
    const rows = text.length + 2;
    const cols = pattern.length + 2;
    return { rows, cols };
};

const createTableMatrix = (pattern: string, text: string): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(pattern, text);
    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = pattern.charAt(col - 2);
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = text.charAt(row - 2);
    }

    table[1][1] = 'T';
    for (let row = 2; row < rows; row++) {
        table[row][1] = 'F';
    }

    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (pattern: string, text: string): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(pattern, text);

    const dpTable = createDPTable(pattern, text);
    const tableMatrix = createTableMatrix(pattern, text);

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

const createTableStyles = (pattern: string, text: string): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(pattern, text);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (): boolean[] => [true, false];
const createButtonsStyles = (): (React.CSSProperties)[] => [{}, {}];

export {
    addHelperStyles,
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
};
