import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = {
    row: 0,
    col: 1,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (houses: number[]): TableSize => {
    const rows = 1;
    const cols = houses.length;
    return { rows, cols };
};

const createTableMatrix = (houses: number[]): (number | string)[][] => {
    const table = [];
    table[0] = houses.map(house => house);
    return table;
};

const createComparedTable = (houses: number[]): (number | string)[][] => {
    const table = [];
    table[0] = createDPTable(houses);
    return table;
};

const addHelperStyles = (styles: React.CSSProperties[][], { row, col }: Point): void => {
    styles[row][col] = helperStyle;
    styles[row][col - 1] = helperStyleSecondary;
    if (col > 1) {
        styles[row][col - 2] = helperStyle;
    }
};

const createTableStyles = (houses: number[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(houses);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (houses: number[]): number[] => {
    const dpTable = createDPTable(houses);
    const set = new Set<number>();
    for (let i = 1; i < dpTable.length; i++) {
        set.add(dpTable[i]);
    }
    return Array.from(set).sort((a, b) => a - b);
};

const createButtonsStyles = (houses: number[]): (React.CSSProperties)[] => {
    return createButtons(houses).map(() => ({ color: 'back' }));
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
