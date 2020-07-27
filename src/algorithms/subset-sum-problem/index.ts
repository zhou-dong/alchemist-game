import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = {
    row: 2,
    col: 2,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (total: number, array: number[]): TableSize => {
    const rows = array.length + 2;
    const cols = total + 2;
    return { rows, cols };
};

const createTableMatrix = (total: number, array: number[]): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(total, array);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = col - 1;
        table[1][col] = 'F';
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = array[row - 2];
        table[row][1] = 'T';
    }

    table[1][1] = 'T';
    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (total: number, array: number[]): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(total, array);

    const dpTable = createDPTable(total, array);
    const tableMatrix = createTableMatrix(total, array);

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 1][col - 1];
        }
    }
    return tableMatrix;
};

const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: (boolean | string)[][]): void => {
    for (let col = 0; col < styles[0].length && col <= point.col; col++) {
        styles[0][col] = helperStyle;
    }

    for (let row = 0; row < styles.length && row <= point.row; row++) {
        styles[row][0] = helperStyle;
    }

    styles[point.row - 1][point.col] = helperStyleSecondary;

    const weight = table[0][point.col];
    const current = table[point.row][0];

    if (weight >= current) {
        styles[point.row - 1][point.col - Number(current)] = helperStyleSecondary;
    }
};

const createTableStyles = (total: number, array: number[], table: (boolean | string)[][]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(total, array);
    const styles = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(styles, startPoint, table);
    return styles;
};

const createButtons = (total: number, array: number[]): boolean[] => [true, false];

const createButtonsStyles = (total: number, array: number[]): (React.CSSProperties)[] => {
    return createButtons(total, array).map(() => ({ color: 'back' }));
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
