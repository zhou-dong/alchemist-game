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

const getTableSize = (coins: number[], total: number): TableSize => {
    const rows = coins.length + 2;
    const cols = total + 2;
    return { rows, cols };
};

const createTableMatrix = (coins: number[], total: number): (number | string)[][] => {
    const { rows, cols } = getTableSize(coins, total);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = col - 1;
        table[1][col] = - 1;
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = coins[row - 2];
        table[row][1] = 0;
    }

    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (coins: number[], total: number): (number | string)[][] => {
    const { rows, cols } = getTableSize(coins, total);

    const dpTable = createDPTable(coins, total);
    const tableMatrix = createTableMatrix(coins, total);

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 1][col - 1];
        }
    }
    return tableMatrix;
};

const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: number[][]): void => {
    styles[0][point.col] = helperStyle;
    styles[point.row][0] = helperStyle;
    styles[point.row - 1][point.col] = helperStyleSecondary;
    const coin = table[point.row][0];
    if (point.col - coin - 1 >= 0) {
        styles[point.row][point.col - coin] = helperStyleThird;
    }
};

const createTableStyles = (coins: number[], total: number): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(coins, total);
    const dpTable = createDPTable(coins, total);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint, dpTable);
    return table;
};

const createButtons = (coins: number[], total: number): number[] => {
    const dpTable = createDPTable(coins, total);
    const set = new Set<number>();
    for (let row = 1; row < dpTable.length; row++) {
        for (let col = 1; col < dpTable[row].length; col++) {
            const value = dpTable[row][col];
            if (value === Infinity) {
                set.add(-1);
            } else {
                set.add(value);
            }
        }
    }
    return Array.from(set).sort();
};

const createButtonsStyles = (coins: number[], total: number): (React.CSSProperties)[] => {
    return createButtons(coins, total).map(() => ({ color: 'back' }));
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
