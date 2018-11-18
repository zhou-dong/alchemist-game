import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = {
    row: 1,
    col: 1,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (array: number[]): TableSize => {
    return { rows: 2, cols: array.length };
};

const createTableMatrix = (array: number[]): number[][] => {
    const table: number[][] = [];
    table[0] = array.map(item => item);
    table[1] = Array(array.length).fill(1);
    return table;
};

const createComparedTable = (array: number[]): number[][] => {
    return createDPTable(array);
};

const addHelperStyles = (styles: React.CSSProperties[][], { row, col }: Point): void => {
    styles[0][row - 1] = helperStyleSecondary;
    styles[1][row - 1] = helperStyle;

    styles[0][col] = helperStyleSecondary;
    styles[1][col] = helperStyle;
};

const createTableStyles = (array: number[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(array);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (array: number[]): number[] => {
    const dpTable = createDPTable(array);
    const set = new Set<number>();
    for (let row = 1; row < dpTable.length; row++) {
        for (let col = 1; col < dpTable[row].length; col++) {
            set.add(dpTable[row][col]);
        }
    }
    return Array.from(set).sort();
};

const createButtonsStyles = (array: number[]): (React.CSSProperties)[] => {
    return createButtons(array).map(() => ({ color: 'back' }));
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
