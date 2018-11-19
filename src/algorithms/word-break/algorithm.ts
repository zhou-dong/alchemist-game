const initTable = (sentence: string): boolean[][] => {
    const length = sentence.length;
    return Array(length).fill(false).map(() => Array(length).fill(false));
};

const createDPTable = (sentence: string, dictionary: string[]): boolean[][] => {
    const table = initTable(sentence);
    for (let len = 1; len <= sentence.length; len++) {
        for (let start = 0, end = start + len - 1; end < sentence.length; start++ , end++) {
            const sub = sentence.substring(start, end + 1);
            if (dictionary.includes(sub)) {
                table[start][end] = true;
                continue;
            }
            for (let i = start; i < end; i++) {
                if (table[start][i] && table[i + 1][end]) {
                    table[start][end] = true;
                    break;
                }
            }
        }
    }
    return table;
};

export default createDPTable;
