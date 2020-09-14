import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';
const startPoint: Point = {
    row: 1,
    col: 2,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (array: number[]): TableSize => {
    const rows = 2;
    const cols = array.length + 1;
    return { rows, cols };
};

const createTableMatrix = (array: number[]): (number | string)[][] => {
    const { cols } = getTableSize(array);
    const fistRow: (string | number)[] = ['INPUT', ...array];
    const secondRow: (string | number)[] = ['JUMPS', 0, ...new Array(cols - 2).fill("MAX")];

    return [fistRow, secondRow];
};

const createComparedTable = (array: number[]): number[][] => createDPTable(array);

const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: (string | number)[][]): void => {

    const length = Number(table[0][point.row])

    styles[0][point.row] = helperStyleSecondary;
    styles[1][point.row] = helperStyleSecondary;
    for (let i = 1; i <= length; i++) {
        if (point.row + i < styles[0].length) {
            styles[0][point.row + i] = helperStyle;
        }
    }
};

const createTableStyles = (array: number[], table: (string | number)[][]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(array);
    const styles = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    styles[startPoint.row][startPoint.col] = helperStyle;
    addHelperStyles(styles, startPoint, table);
    return styles;
};

const max = Number.MAX_SAFE_INTEGER;

const createButtons = (array: number[]): (string | number)[] => {
    const dpTable = createDPTable(array);
    const set = new Set<string | number>();
    for (let row = 0; row < dpTable.length; row++) {
        for (let col = 0; col < dpTable[row].length; col++) {
            const value = dpTable[row][col];
            set.add(value);
        }
    }
    set.delete(0);
    set.delete(max);

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
