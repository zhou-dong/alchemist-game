const getTableSize = (pattern: string, text: string) => {
    const rows = text.length + 1;
    const cols = pattern.length + 1;
    return { rows, cols };
};

const createDPTable = (pattern: string, text: string): boolean[][] => {
    const { rows, cols } = getTableSize(pattern, text);

    const table = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
    table[0][0] = true;

    for (let col = 1; col < pattern.length; col += 1) {
        if (pattern.charAt(col - 1) === '*') {
            table[0][col] = table[0][col - 2] || false;
        }
    }

    for (let row = 1; row < table.length; row++) {
        const t = text.charAt(row - 1);
        for (let col = 1; col < table[row].length; col++) {
            const p = pattern.charAt(col - 1);
            if (p === '.' || p === t) {
                table[row][col] = table[row - 1][col - 1];
            } else if (p === '*') {
                if (table[row][col - 2]) {
                    table[row][col] = table[row][col - 2];
                } else if (pattern.charAt(col - 2) === '.' || pattern.charAt(col - 2) === t) {
                    table[row][col] = table[row - 1][col];
                }
            }
        }
    }
    return table;
};

export default createDPTable;
