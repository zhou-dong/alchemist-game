const createDPTable = (sequence: string): number[][] => {
    const rows = sequence.length + 1;
    const cols = sequence.length + 1;

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    // length === 1;
    for (let i = 0; i < table.length; i += 1) {
        table[i][i] = 1;
    }

    // length === 2;
    for (let i = 0; i < table.length - 1; i += 1) {
        if (sequence.charAt(i) === sequence.charAt(i + 1)) {
            table[i][i + 1] = 2;
        } else {
            table[i][i + 1] = 1;
        }
    }

    // length > 2;
    for (let len = 3; len <= table.length; len += 1) {
        for (let i = 0; i + len <= table.length; i += 1) {
            const front = sequence.charAt(i);
            const end = sequence.charAt(i + len - 1);
            if (front === end) {
                table[i][i + len - 1] = 2 + table[i + 1][i + len - 2];
            } else {
                table[i][i + len - 1] = Math.max(table[i][i + len - 2], table[i + 1][i + len - 1]);
            }
        }
    }

    return table;
};

export default createDPTable;
