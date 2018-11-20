import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
// import { helperStyle } from '../../pages/withRoot';

const startPoint: Point = { row: 2, col: 1 };

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (array: number[]): TableSize => {
    const rows = 4;
    const cols = array.length + 1;
    return { rows, cols };
};

const createTableMatrix = (array: number[]): (number | string)[][] => {
    const { rows, cols } = getTableSize(array);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));
    table[0][0] = 'INDEX';
    table[1][0] = 'VALUE';
    table[2][0] = 'CUR_MAX';
    table[3][0] = 'GLO_MAX';

    for (let col = 1; col < cols; col++) {
        table[0][col] = col - 1;
        table[1][col] = array[col - 1];
    }

    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (array: number[]): (number | string)[][] => createDPTable(array);

const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: (string | number)[][]): void => {
    // TODO
};

const createTableStyles = (array: number[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(array);
    const compareTable = createComparedTable(array);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint, compareTable);
    return table;
};

const createButtons = (array: number[]): number[] => {
    const set = new Set<number>();
    const dpTable = createDPTable(array);
    for (let col = 0; col < array.length; col++) {
        const currentMax = Number(dpTable[2][col + 1]);
        const globalMax = Number(dpTable[3][col + 1]);
        set.add(currentMax);
        set.add(globalMax);
    }
    return Array.from(set).sort(((a, b) => a - b));
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
