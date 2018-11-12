const createDPTable = (total: number, array: number[]): boolean[][] => {
    const rows = array.length + 1;
    const cols = total + 1;

    const table = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

    for (let row = 0; row < rows; row++) {
        table[row][0] = true;
    }

    for (let row = 1; row < rows; row++) {
        const element = array[row - 1];
        for (let col = 1; col < cols; col++) {
            if (element > col) {
                table[row][col] = table[row - 1][col];
            } else {
                table[row][col] = table[row - 1][col] || table[row - 1][col - element];
            }
        }
    }

    console.log(table);
    return table;
};

export default createDPTable;
