import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = { row: 2, col: 2 };

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (eggs: number, floors: number): TableSize => {
    const rows = eggs + 1;
    const cols = floors + 2;
    return { rows, cols };
};

const createTableMatrix = (eggs: number, floors: number): (number | string)[][] => {
    const { rows, cols } = getTableSize(eggs, floors);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(''));
    table[0][0] = 'EG\\FL';
    for (let col = 1; col < cols; col++) {
        table[0][col] = col - 1;
        table[1][col] = col - 1;
    }
    for (let row = 1; row < rows; row++) {
        table[row][0] = row;
        table[row][1] = 0;
    }
    return table;
};

const createComparedTable = (eggs: number, floors: number): (number | string)[][] => {
    const { rows, cols } = getTableSize(eggs, floors);

    const dpTable = createDPTable(eggs, floors);
    const tableMatrix = createTableMatrix(eggs, floors);

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 1][col - 1];
        }
    }
    return tableMatrix;
};

const addHelperStyles = (styles: React.CSSProperties[][], point: Point): void => {
    for (let col = 0; col < styles[0].length; col++) {
        styles[0][col] = helperStyleSecondary;
    }
    for (let row = 0; row < styles.length; row++) {
        styles[row][0] = helperStyleSecondary;
        styles[row][1] = helperStyleSecondary;
    }
    styles[point.row][point.col] = helperStyle;
};

const createTableStyles = (eggs: number, floors: number): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(eggs, floors);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (eggs: number, floors: number): number[] => {
    const dpTable = createDPTable(eggs, floors);
    const set = new Set<number>();
    for (let row = 1; row < dpTable.length; row++) {
        for (let col = 1; col < dpTable[row].length; col++) {
            set.add(dpTable[row][col]);
        }
    }
    return Array.from(set).sort();
};

const createButtonsStyles = (eggs: number, floors: number): (React.CSSProperties)[] => {
    return createButtons(eggs, floors).map(() => ({ color: 'back' }));
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
