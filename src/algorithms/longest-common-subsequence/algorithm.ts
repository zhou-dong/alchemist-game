const createDPTable = (stringOne: string, stringTwo: string): number[][] => {
    const rows = stringTwo.length + 1;
    const cols = stringOne.length + 1;

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            if (stringOne.charAt(col - 1) === stringTwo.charAt(row - 1)) {
                table[row][col] = table[row - 1][col - 1] + 1;
            } else {
                table[row][col] = Math.max(table[row][col - 1], table[row - 1][col]);
            }
        }
    }

    return table;
};

export default createDPTable;
