const createDPTable = (houses: number[]): number[] => {
    const table = houses.map(house => house);

    if (table.length < 2) {
        return table;
    }

    table[1] = Math.max(table[0], table[1]);
    for (let i = 2; i < table.length; i++) {
        table[i] = Math.max(table[i] + table[i - 2], table[i - 1]);
    }

    return table;
};

export default createDPTable;
