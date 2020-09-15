export const description = `Given an input string and a dictionary of words, 
find out if the input string can be segmented 
into a space-separated sequence of dictionary 
words.`;

export const alUsecases = '';
export const formula = `function wordBreak(s: string, wordDict: string[]): boolean {

    const table = Array(s.length).fill(false).map(() => Array(s.length).fill(false));
    const wordDictSet: Set<string> = new Set(wordDict);

    for (let len = 1; len <= s.length; len++) {
        for (let start = 0, end = start + len - 1; end < s.length; start++ , end++) {
            const sub = s.substring(start, end + 1);
            if (wordDictSet.has(sub)) {
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

    return table[0][s.length - 1];
};
`;

export const example = `
Example 1:

- Input: s = "helloworld", wordDict = \\["hello", "world"]
- Output: true
- Explanation: Return true because "helloworld" can be segmented as "hello world".

Example 2:

- Input: s = "itisanice", wordDict = \\["a", "an", "i", "ice", "is", "it", "nice"]
- Output: true
- Explanation: Return true because "itisanice" can be segmented as "it is an ice".
`;
