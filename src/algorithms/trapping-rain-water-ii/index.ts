import createDPTable, { createLeftMax, createRightMax, createGuiders } from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = {
    row: 0,
    col: 0,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (nums: number[]): TableSize => {
    return { rows: Math.max(...nums), cols: nums.length + 1 };
};

const createTableMatrix = (nums: number[]): (number | string)[][] => {
    const { rows, cols } = getTableSize(nums);
    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let row = 0; row < rows; row++) {
        table[row][0] = rows - row;
    }

    return table;
};

const createComparedTable = (nums: number[]): (number | string)[][] => [];

const addHelperStyles = (styles: React.CSSProperties[][], point: Point): void => {
    for (let col = 0; col < styles[0].length && col <= point.col; col++) {
        styles[0][col] = helperStyle;
    }

    for (let row = 0; row < styles.length && row <= point.row; row++) {
        styles[row][0] = helperStyle;
    }
};

const createTableStyles = (nums: number[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(nums);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    const dpTable = createDPTable(nums);

    for (let row = 0; row < rows; row++) {
        table[row][0] = { borderWidth: 0, border: 0 }
    }

    for (let col = 1; col < cols; col++) {
        const elevations = nums[col - 1];
        for (let i = 0; i < elevations; i++) {
            table[rows - 1 - i][col] = { backgroundColor: "rgb(23,13,1)" };
        }
    }

    for (let col = 1; col < cols; col++) {
        const elevations = nums[col - 1];
        const wasters = dpTable[col - 1];
        for (let i = 0; i < wasters; i++) {
            table[rows - 1 - elevations - i][col] = helperStyleSecondary;
        }
    }

    return table;
};

const createButtons = (nums: number[]): string[] => {
    return ["--->", "<---"];
};

const createButtonsStyles = (nums: number[]): (React.CSSProperties)[] => {
    return createButtons(nums).map(() => ({ color: 'back' }));
};

export {
    addHelperStyles,
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    createDPTable,
    createLeftMax,
    createRightMax,
    createGuiders,
    startPoint,
};
