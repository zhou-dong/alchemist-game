const createDPTable = (nums: number[]): number[][] => {

    const rows = 2;
    const cols = nums.length;

    const table = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    for (let col = 0; col < cols; col++) {
        table[0][col] = nums[col];
        table[1][col] = col;
    }

    return table;
};

export default createDPTable;
