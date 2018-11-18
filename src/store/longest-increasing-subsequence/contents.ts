export const formula = `if (toCompare < target) {
  table[row][col] = Math.max(
    table[row - 1][col], 
    table[row - 1][row - 1] + 1
  );
} else {
  table[row][col] = table[row - 1][col];
}`;

export const description = `Given an unsorted array of integers, find the 
length of longest increasing subsequence. `;

export const useCases = '';

export const example = `Given [10, 9, 2, 5, 3, 7, 101, 18],
The longest increasing subsequence is 
[2, 3, 7, 101], therefore the length is 4.`;
