const cloneTable = (table: number[][]): number[][] => table.map(row => row.map(item => item));

const createDPTable = (table: number[][]): number[][] => {
    const result: number[][] = cloneTable(table);

    for (let col = 1; col < result[0].length; col++) {
        result[0][col] = result[0][col - 1] + result[0][col];
    }

    for (let row = 1; row < result.length; row++) {
        result[row][0] = result[row - 1][0] + result[row][0];
    }

    for (let row = 1; row < result.length; row++) {
        for (let col = 1; col < result[row].length; col++) {
            result[row][col] = result[row][col] + Math.min(result[row - 1][col], result[row][col - 1]);
        }
    }

    return result;
};

export default createDPTable;
