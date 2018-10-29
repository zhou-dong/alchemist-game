import { RodCuttingItem } from './RodCuttingItem';

interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (items: RodCuttingItem[], totalPrice: number): TableSize => {
    const rows = items.length + 1;
    const cols = totalPrice + 1;
    return { rows, cols };
};

const createDPTable = (items: RodCuttingItem[], totalPrice: number): number[][] => {
    const { rows, cols } = getTableSize(items, totalPrice);

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    for (let row = 1; row < rows; row++) {
        const item = items[row - 1];
        for (let col = 1; col < cols; col++) {
            if (item.length > col) {
                table[row][col] = table[row - 1][col];
            } else {
                table[row][col] = Math.max(
                    table[row - 1][col],
                    table[row][col - item.length] + item.price
                );
            }
        }
    }

    return table;
};

export default createDPTable;
