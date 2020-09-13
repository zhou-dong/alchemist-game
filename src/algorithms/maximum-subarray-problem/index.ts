import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle } from '../../pages/withRoot';

const startPoint: Point = { row: 2, col: 1 };

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
    const { rows, cols } = getTableSize(array);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));
    table[0][0] = 'INDEX';
    table[1][0] = 'VALUE';
    table[2][0] = 'CUR_MAX';

    for (let col = 1; col < cols; col++) {
        table[0][col] = col - 1;
        table[1][col] = array[col - 1];
    }

    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (array: number[]): (number | string)[][] => createDPTable(array);

const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: (string | number)[][]): void => { };

const addMaxSumRange = (styles: React.CSSProperties[][], point: Point, table: (string | number)[][]): void => {
    const start = Number(table[0][point.col]) + 1;
    const end = Number(table[1][point.col]) + 1;
    for (let i = start; i <= end && styles.length; i++) {
        styles[1][i] = helperStyle;
    }
};

const updateMaxValueStyles = (styles: React.CSSProperties[][], point: Point, table: (string | number)[][]): void => {

    const currentMaxs = table[2];

    const findMax = (): number => {
        let max = Number(currentMaxs[1]);
        for (let i = 2; i < currentMaxs.length; i++) {
            max = Math.max(max, Number(currentMaxs[i]));
        }
        return max;
    }

    const updateStyles = (max: number): void => {
        for (let i = 0; i < currentMaxs.length; i++) {
            const current = Number(currentMaxs[i]);
            if (max === current) {
                styles[2][i] = helperStyle;
            }
        }
    }

    const max = findMax();
    updateStyles(max);
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
        set.add(currentMax);
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
    addMaxSumRange,
    updateMaxValueStyles,
    startPoint,
};
