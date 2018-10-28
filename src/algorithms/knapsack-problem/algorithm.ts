const createDPTable = (stringOne: string, stringTwo: string): number[][] => {
    const rows = stringTwo.length + 1;
    const cols = stringOne.length + 1;

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    for (let col = 0; col < cols; col++) {
        table[0][col] = col;
    }

    for (let row = 0; row < rows; row++) {
        table[row][0] = row;
    }

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            if (stringOne.charAt(col - 1) === stringTwo.charAt(row - 1)) {
                table[row][col] = table[row - 1][col - 1];
            } else {
                const min = Math.min(
                    table[row - 1][col - 1],
                    table[row - 1][col],
                    table[row][col - 1]
                );
                table[row][col] = min + 1;
            }
        }
    }

    return table;
};

export default createDPTable;
