export const formula = `if (element > weight) {
  table[row][col] = table[row - 1][col];
} else {
  table[row][col] = table[row - 1][col] || table[row - 1][weight - element];
}`;

export const description = `Given a set of non-negative integers, and a 
value sum, determine if there is a subset of
the given set with sum equal to given sum. `;

export const alUsecases = '';

export const example = `
Example 1:

- Input: set = \\[3, 34, 4, 12, 5, 2\\], sum = 9
- Output: True
- Explanation: subset \\[4, 5\\] with sum 9

Example 2:

- Input: set = \\[3, 34, 4, 12, 5, 2\\], sum = 35
- Output: False
`;
