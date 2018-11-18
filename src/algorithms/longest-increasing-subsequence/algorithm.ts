const initTable = (array: number[]) => array.map(() => Array(array.length).fill(1));

const createDPTable = (array: number[]): number[][] => {
    const table = initTable(array);

    for (let col = 1; col < array.length; col++) {
        for (let row = 1; row <= col; row++) {
            const toCompare = array[row - 1];
            const target = array[col];
            if (toCompare < target) {
                table[row][col] = Math.max(table[row - 1][col], table[row - 1][row - 1] + 1);
            } else {
                table[row][col] = table[row - 1][col];
            }
        }
    }

    return table;
};

export default createDPTable;
