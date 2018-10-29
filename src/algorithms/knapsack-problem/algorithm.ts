import { KnapSackItem } from './KnapsackItem';

const createDPTable = (items: KnapSackItem[], totalWeight: number): number[][] => {
    const rows = items.length + 1;
    const cols = totalWeight + 1;

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    for (let row = 1; row < rows; row++) {
        const item = items[row - 1];
        for (let col = 1; col < cols; col++) {
            if (item.weight > col) {
                table[row][col] = table[row - 1][col];
            } else {
                table[row][col] = Math.max(
                    table[row - 1][col],
                    table[row - 1][col - item.weight] + item.value
                );
            }
        }
    }

    return table;
};

export default createDPTable;
