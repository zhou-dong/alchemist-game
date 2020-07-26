export const formula = `if (a === b) {
  table[row][col] = table[row - 1][col - 1] + 1;
} else {
  table[row][col] = 0;
}`;

export const description = `Given two strings ‘string1’ and ‘string2’, find the length 
of the longest common substring.`;

export const alUsecases = '';

export const example = `
Example 1:

- Input : string1 = "algorithms", string2 = "alchemist"
- Output : 2
- Explanation: The longest common substring is "al" and is of length 2.

Example 2:

- Input : string1 = "abcdxyz", string2 = "xyzabcd"
- Output : 4
- Explanation: The longest common substring is "abcd" and is of length 4.
`;
