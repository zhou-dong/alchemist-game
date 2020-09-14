import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary, helperStyleThird } from '../../pages/withRoot';

const updatedSecondaryHelper = { ...helperStyleSecondary, backgroundColor: "lightgray" };

const max = Number.MAX_SAFE_INTEGER;

const startPoint: Point = {
    row: 0,
    col: 1,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (array: number[]): TableSize => {
    const rows = 3;
    const cols = array.length + 1;
    return { rows, cols };
};

const createTableMatrix = (array: number[]): (number | string)[][] => {
    const table: (number | string)[][] = [];
    const indices: (string | number)[] = ['INDEX', ...Array.from(Array(array.length).keys())];
    const jumps: (string | number)[] = ['JUMPS', ...array];
    const result: (string | number)[] = ['RESULT', 0, ...Array(array.length - 1).fill('x')];
    table[0] = indices;
    table[1] = jumps;
    table[2] = result;
    return table;
};

const createComparedTable = (array: number[]): number[][] => createDPTable(array);

const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: (string | number)[][]): void => {
    styles[0][point.row + 1] = helperStyle;
    styles[0][point.col + 1] = helperStyle;
    const jumpIndex = point.row + 2;
    const jumpLength = Number(table[1][point.row + 1]);

    const jumpsStyles = styles[1];
    for (let i = jumpIndex; i < jumpsStyles.length && i < (jumpIndex + jumpLength); i++) {
        jumpsStyles[i] = updatedSecondaryHelper;
    }

    if (jumpIndex + jumpLength > point.col + 1) {
        styles[2][jumpIndex - 1] = helperStyleThird;
    }

    styles[2][point.col + 1] = helperStyleThird;
};

const createTableStyles = (array: number[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(array);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint, createTableMatrix(array));
    return table;
};

const createButtons = (array: number[]): (string | number)[] => {
    const dpTable = createDPTable(array);
    const set = new Set<string | number>();
    for (let row = 0; row < dpTable.length; row++) {
        for (let col = 0; col < dpTable[row].length; col++) {
            const value = dpTable[row][col];
            if (value === max) {
                set.add('x');
            } else {
                set.add(value);
            }
        }
    }
    set.delete(0);
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
