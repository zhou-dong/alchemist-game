import createDPTable from './algorithm';
import { Point } from '../../store/BasicState';
import { helperStyle, helperStyleSecondary } from '../../pages/withRoot';

const startPoint: Point = {
    row: 2,
    col: 2,
};

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (sentence: string, dictionary: string[]): TableSize => {
    const rows = sentence.length + 2;
    const cols = sentence.length + 2;
    return { rows, cols };
};

const createTableMatrix = (sentence: string, dictionary: string[]): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(sentence, dictionary);

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = sentence.charAt(col - 2);
        table[1][col] = col - 1;
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = sentence.charAt(row - 2);
        table[row][1] = row - 1;
    }

    table[1][1] = 0;
    table[startPoint.row][startPoint.col] = '?';
    return table;
};

const createComparedTable = (sentence: string, dictionary: string[]): (boolean | string)[][] => {
    const { rows, cols } = getTableSize(sentence, dictionary);

    const dpTable = createDPTable(sentence, dictionary);
    const tableMatrix = createTableMatrix(sentence, dictionary);

    for (let row = 2; row < rows; row++) {
        for (let col = 2; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 2][col - 2];
        }
    }
    return tableMatrix;
};

const addHelperStyles = (styles: React.CSSProperties[][], { row, col }: Point): void => {
    for (let i = row; i <= col; i++) {
        styles[0][i] = helperStyleSecondary;
        styles[1][i] = helperStyle;

        styles[i][0] = helperStyleSecondary;
        styles[i][1] = helperStyle;
    }
};

const createTableStyles = (sentence: string, dictionary: string[]): (React.CSSProperties)[][] => {
    const { rows, cols } = getTableSize(sentence, dictionary);
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (sentence: string, dictionary: string[]): boolean[] => [true, false];

const createButtonsStyles = (sentence: string, dictionary: string[]): (React.CSSProperties)[] => {
    return createButtons(sentence, dictionary).map(() => ({ color: 'back' }));
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
