export const formula = `if (a === b) {
  table[row][col] = table[row - 1][col - 1] + 1;
} else {
  table[row][col] = Math.max(table[row][col - 1], table[row - 1][col]);
}`;

export const description = `Given two sequences, find the length of longest 
subsequence present in both of them. A subsequence 
is a sequence that appears in the same relative 
order, but not necessarily contiguous. `;

export const alUsecases = '';

export const example = `
- Input: string1 = "algorithms" string2 = "alchemist"
- Output: 5
- Explanation: The longest common subsequence are "alhms" and its length is 5.
`;
