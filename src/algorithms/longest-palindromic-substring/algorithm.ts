interface TableSize {
    rows: number;
    cols: number;
}

const getTableSize = (sequence: string): TableSize => {
    const rows = sequence.length;
    const cols = sequence.length;
    return { rows, cols };
};

const createMarksTable = (sequence: string, truthTable: boolean[][]): number[][] => {
    const { rows, cols } = getTableSize(sequence);
    const table = Array(rows).fill(1).map(() => Array(cols).fill(1));

    let max = 1;
    for (let i = 0; i < table.length - 1; i += 1) {
        if (sequence.charAt(i) === sequence.charAt(i + 1)) {
            max = 2;
        }
        table[i][i + 1] = max;
    }
    for (let len = 3; len <= table.length; len += 1) {
        for (let i = 0; i + len <= table.length; i += 1) {
            const front = sequence.charAt(i);
            const end = sequence.charAt(i + len - 1);
            if (front === end && truthTable[i][i + len - 1]) {
                max = Math.max(max, 2 + table[i + 1][i + len - 2]);
            }
            table[i][i + len - 1] = max;
        }
    }
    return table;
};

const createDPTable = (sequence: string): boolean[][] => {
    const { rows, cols } = getTableSize(sequence);

    const table = Array(rows).fill(false).map(() => Array(cols).fill(false));

    for (let i = 0; i < table.length; i++) {
        table[i][i] = true;
    }

    for (let i = 0; i < table.length - 1; i++) {
        if (sequence.charAt(i) === sequence.charAt(i + 1)) {
            table[i][i + 1] = true;
        } else {
            table[i][i + 1] = false;
        }
    }

    for (let len = 3; len <= table.length; len++) {
        for (let i = 0; i + len <= table.length; i++) {
            const front = sequence.charAt(i);
            const end = sequence.charAt(i + len - 1);
            if (front === end) {
                table[i][i + len - 1] = table[i + 1][i + len - 2];
            } else {
                table[i][i + len - 1] = false;
            }
        }
    }

    return table;
};

export { createDPTable, createMarksTable };
