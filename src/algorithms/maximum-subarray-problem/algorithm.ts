// 这个算法稍微有点难度的地方是计算最大区间的起始位置和结束位置。
// 首先结束位置容易计算，当每次更新最大值的时候，同时更新结束位置就行。
// 起始位置比较麻烦：
// 1. 首先定义一个 maybelaststart
// 2. 每次当 current > current + currentMaxs[index - 1];
//     maybelaststart = index;
// 3. 每次更新最大值的时候，start = maybelaststart

const createDPTable = (array: number[]): (number | string)[][] => {

    const currentMaxs: (string | number)[] = [array[0]];
    const globalMaxs: (string | number)[] = [array[0]];
    const starts: (string | number)[] = [0];
    const ends: (string | number)[] = [0];

    let lastStart = 0;
    array.forEach((value, index) => {
        value = Number(value);
        if (index < 1) {
            return;
        }
        let [currentMax, globalMax, end] = [0, 0, 0];
        let start = starts[index - 1];
        if (value > value + Number(currentMaxs[index - 1])) {
            currentMax = value;
            lastStart = index;
        } else {
            currentMax = value + Number(currentMaxs[index - 1]);
        }
        if (currentMax > globalMaxs[index - 1]) {
            globalMax = currentMax;
            end = index;
            start = lastStart;
        } else {
            globalMax = Number(globalMaxs[index - 1]);
            end = Number(ends[index - 1]);
        }
        currentMaxs.push(currentMax);
        globalMaxs.push(globalMax);
        ends.push(end);
        starts.push(start);
    });

    const table: (number | string)[][] = [];
    starts.unshift('starts');
    ends.unshift('ends');
    currentMaxs.unshift('current_max');
    globalMaxs.unshift('global_max');

    table.push(starts);
    table.push(ends);
    table.push(currentMaxs);
    table.push(globalMaxs);
    return table;
};

export default createDPTable;
