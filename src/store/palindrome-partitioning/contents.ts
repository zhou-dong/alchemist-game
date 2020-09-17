export const formula = `const createPalindromeBooleanTable = (sequence: string): boolean[][] => {

  const rows = sequence.length;
  const cols = sequence.length;

  const table = Array(rows).fill(false).map(() => Array(cols).fill(false));

  // length === 1;
  for (let i = 0; i < table.length; i += 1) {
      table[i][i] = true;
  }

  // length === 2;
  for (let i = 0; i < table.length - 1; i += 1) {
      if (sequence.charAt(i) === sequence.charAt(i + 1)) {
          table[i][i + 1] = true;
      }
  }

  // length > 2;
  for (let len = 3; len <= table.length; len += 1) {
      for (let i = 0; i + len <= table.length; i += 1) {
          const front = sequence.charAt(i);
          const end = sequence.charAt(i + len - 1);
          if (front === end) {
              table[i][i + len - 1] = table[i + 1][i + len - 2];
          }
      }
  }

  return table;
};

const createDPTable = (sequence: string): number[][] => {
  const booleanTable = createPalindromeBooleanTable(sequence);

  const rows = sequence.length;
  const cols = sequence.length;

  const table = Array(rows).fill(0).map(() => Array(cols).fill(0));

  // length === 1;
  for (let i = 0; i < table.length; i += 1) {
      table[i][i] = 0;
  }

  // length === 2;
  for (let i = 0; i < table.length - 1; i += 1) {
      if (sequence.charAt(i) !== sequence.charAt(i + 1)) {
          table[i][i + 1] = 1;
      }
  }

  // length > 2;
  for (let len = 3; len <= table.length; len += 1) {
      for (let row = 0; row + len <= table.length; row += 1) {
          const col = row + len - 1;
          if (!booleanTable[row][col]) {
              let min = sequence.length;
              for (let k = row; k < col; k += 1) {
                  min = Math.min(min, table[row][k] + table[k + 1][col]);
                  if (min === 0) {
                      break; // optimize
                  }
              }
              table[row][col] = min + 1;
          }
      }
  }

  return table;
};

function minCut(s: string): number {
  const table = createDPTable(s);
  return table[0][s.length - 1];
};
`;

export const description = `Given a string s partition s such that every 
substring of the partition is a palindrome. Return 
the minimum cuts needed for a palindrome 
partitioning of s.`;

export const alUsecases = '';

export const example = `
Example 1:

- Input: "mammal"
- Output: 2
- Explanation: The palindrome partitioning \\["m", "amma", "l"] could be produced using 2 cut.

Example 2:
- Input: "m"
- Output: 0
`;
