import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = { row: 0, col: 1 };

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (table: number[][]): TableSize => {
    const rows = table.length;
    const cols = table[rows - 1].length;
    return { rows, cols };
};

const createTableMatrix = (table: number[][]): number[][] => {
    return table.map(row => row.map(item => item));
};

const createComparedTable = (table: number[][]): (number | string)[][] => {
    return createDPTable(table);
};

const addHelperStyles = (styles: React.CSSProperties[][], { row, col }: Point): void => {
    const helper = helperStyle;
    const target = helperStyleSecondary;
    if (row === 0) {
        styles[0][col - 1] = helper;
        styles[0][col] = target;
    } else if (col === 0) {
        styles[row - 1][0] = helper;
        styles[row][0] = target;
    } else {
        styles[row - 1][col] = helper;
        styles[row][col - 1] = helper;
        styles[row][col] = target;
    }
};

const createTableStyles = (table: number[][]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(table);
    const styles = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(styles, startPoint);
    return styles;
};

const createButtons = (table: number[][]): number[] => {
    const dpTable = createDPTable(table);
    const set = new Set<number>();

    for (let col = 1; col < dpTable[0].length; col++) {
        set.add(dpTable[0][col]);
    }

    for (let row = 1; row < dpTable.length; row++) {
        set.add(dpTable[row][0]);
    }

    for (let row = 1; row < dpTable.length; row++) {
        for (let col = 1; col < dpTable[row].length; col++) {
            set.add(dpTable[row][col]);
        }
    }

    return Array.from(set).sort((a, b) => a - b);
};

const createButtonsStyles = (table: number[][]): (React.CSSProperties)[] => {
    return createButtons(table).map(() => ({ color: 'back' }));
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
