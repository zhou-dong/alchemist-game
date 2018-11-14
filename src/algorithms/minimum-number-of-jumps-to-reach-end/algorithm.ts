const max = Number.MAX_SAFE_INTEGER;

const initTable = (array: number[]): number[][] => {
    const table: number[][] = [];
    for (let row = 0; row < array.length; row++) {
        table.push(Array(array.length).fill(max));
    }
    table[0][0] = 0;
    return table;
};

const createDPTable = (array: number[]): number[][] => {

    const table = initTable(array);

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < i; j++) {
            const prev = j === 0 ? max : table[j - 1][i];
            let last = (j === 0 ? 0 : table[j - 1][j]) + 1;
            if (j + array[j] < i) {
                last = max;
            }
            table[j][i] = Math.min(last, prev);
        }
    }

    console.log(table);

    return table;
};

export default createDPTable;
