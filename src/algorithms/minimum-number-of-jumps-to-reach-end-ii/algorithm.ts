const max: number = Number.MAX_SAFE_INTEGER;

const initTable = (array: number[]): number[][] => {
    const table: number[][] = [];
    for (let row = 0; row < array.length; row++) {
        table.push(Array(array.length).fill(max));
    }
    return table;
};

const createDPTable = (array: number[]): number[][] => {

    const table = initTable(array);

    if (array[0] <= 0) {
        return table;
    }

    table[0][0] = 0;

    for (let i = 0; i < table.length; i++) {
        if (i > 0) {
            table[i] = [...table[i - 1]];
        }
        for (let j = 1; j <= array[i]; j++) {
            if (i + j >= array.length) {
                break;
            }
            table[i][i + j] = Math.min(table[i][i + j], table[i][i] + 1);
        }
    }

    return table;
};

export default createDPTable;
