interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (coins: number[], total: number): TableSize => {
    const rows = coins.length + 1;
    const cols = total + 1;
    return { rows, cols };
};

const createDPTable = (coins: number[], total: number): number[][] => {
    const { rows, cols } = getTableSize(coins, total);

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    for (let row = 1; row < rows; row++) {
        table[row][0] = 1;
    }

    for (let row = 1; row < table.length; row += 1) {
        const coin = coins[row - 1];
        for (let col = 1; col < table[row].length; col += 1) {
            if (coin > col) {
                table[row][col] = table[row - 1][col];
            } else {
                table[row][col] = table[row][col - coin] + table[row - 1][col];
            }
        }
    }

    return table;
};

export default createDPTable;
