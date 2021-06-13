import createDPTable, { getIndices } from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle } from '../../pages/withRoot';

const startPoint: Point = {
    row: 1,
    col: 1,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (nums: number[]): TableSize => ({ rows: 2, cols: nums.length + 1 });

const createTableMatrix = (nums: number[]): (number | string)[][] => {
    const { rows, cols } = getTableSize(nums);

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    table[0][0] = "index"
    table[1][0] = "value"

    for (let col = 1; col < cols; col++) {
        table[0][col] = col - 1;
    }

    for (let col = 1; col < cols; col++) {
        table[1][col] = nums[col - 1];
    }

    return table;
};

const createComparedTable = (nums: number[]): (number | string)[][] => createDPTable(nums);

const addHelperStyles = (styles: React.CSSProperties[][], point: Point): void => {
    styles[0][0] = { backgroundColor: "lightgray" };
    styles[1][0] = { backgroundColor: "lightgray" };
    styles[1][point.col] = helperStyle;
};

const createTableStyles = (nums: number[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(nums);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (): string[] => {
    return ["Add To HashTable", "Gotcha"];
};

const createButtonsStyles = (nums: number[]): (React.CSSProperties)[] => {
    return createButtons().map(() => ({ color: 'back', paddingLeft: "6px", paddingRight: "6px" }));
};

export {
    addHelperStyles,
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
    getIndices,
};
