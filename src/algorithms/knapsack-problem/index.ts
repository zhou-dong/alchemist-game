import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary, helperStyleThird } from '../../pages/withRoot';
import { KnapSackItem } from './KnapsackItem';

const startPoint: Point = { row: 2, col: 3 };

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (items: KnapSackItem[], totalWeight: number): TableSize => {
    const rows = items.length + 2;
    const cols = totalWeight + 3;
    return { rows, cols };
};

const createTableMatrix = (items: KnapSackItem[], totalWeight: number): (number | string)[][] => {
    const { rows, cols } = getTableSize(items, totalWeight);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));
    table[0][0] = 'V';
    table[0][1] = 'W';
    for (let col = 2; col < cols; col++) {
        table[0][col] = col - 2;
    }

    for (let col = 0; col < cols; col++) {
        table[1][col] = 0;
    }

    for (let row = 2; row < rows; row++) {
        const item = items[row - 2];
        table[row][0] = item.value;
        table[row][1] = item.weight;
        table[row][2] = 0;
    }

    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (items: KnapSackItem[], totalWeight: number): (number | string)[][] => {
    const { rows, cols } = getTableSize(items, totalWeight);

    const dpTable = createDPTable(items, totalWeight);
    const tableMatrix = createTableMatrix(items, totalWeight);

    for (let row = 2; row < rows; row++) {
        for (let col = 3; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 1][col - 2];
        }
    }
    return tableMatrix;
};

const addHelperStyles = (styles: React.CSSProperties[][], point: Point): void => {
    styles[1][3] = helperStyleSecondary;
    styles[0][3] = helperStyleThird;
    styles[2][0] = helperStyle;
    styles[2][1] = helperStyleThird;
};

const createTableStyles = (items: KnapSackItem[], totalWeight: number): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(items, totalWeight);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    if (items[0].weight === 1) {
        table[1][2] = helperStyle;
    }
    return table;
};

const createButtons = (items: KnapSackItem[], totalWeight: number): number[] => {
    const dpTable = createDPTable(items, totalWeight);
    const set = new Set<number>();
    for (let row = 1; row < dpTable.length; row++) {
        for (let col = 1; col < dpTable[row].length; col++) {
            set.add(dpTable[row][col]);
        }
    }
    return Array.from(set).sort(function (a: number, b: number) { return a - b; });
};

const createButtonsStyles = (items: KnapSackItem[], totalWeight: number): (React.CSSProperties)[] => {
    return createButtons(items, totalWeight).map(() => ({ color: 'back' }));
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
