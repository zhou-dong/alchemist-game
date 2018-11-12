const createDPTable = (stringOne: string, stringTwo: string): boolean[][] => {
    const rows = stringTwo.length + 1;
    const cols = stringOne.length + 1;

    const table = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

    for (let col = 0; col < cols; col++) {
        table[0][col] = true;
    }

    for (let row = 1; row < rows; row++) {
        const ch1 = stringTwo.charAt(row - 1);
        for (let col = 1; col < cols; col++) {
            const ch2 = stringOne.charAt(col - 1);
            if (ch1 === ch2 && table[row - 1][col - 1]) {
                table[row][col] = true;
            } else {
                table[row][col] = table[row][col - 1];
            }
        }
    }

    return table;
};

export default createDPTable;
