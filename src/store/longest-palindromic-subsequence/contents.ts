export const formula = `// length === 1;
for (let i = 0; i < table.length; i += 1) {
  table[i][i] = 1;
}

// length === 2;
for (let i = 0; i < table.length - 1; i += 1) {
  if (sequence.charAt(i) === sequence.charAt(i + 1)) {
    table[i][i + 1] = 2;
  } else {
    table[i][i + 1] = 1;
  }
}

// length > 2;
for (let len = 3; len <= table.length; len += 1) {
  for (let i = 0; i + len <= table.length; i += 1) {
    const front = sequence.charAt(i);
    const end = sequence.charAt(i + len - 1);
    if (front === end) {
      table[i][i + len - 1] = 2 + table[i + 1][i + len - 2];
    } else {
      table[i][i + len - 1] = Math.max(table[i][i + len - 2], table[i + 1][i + len - 1]);
    }
  }
}

---

// Java Solution:
public int longestPalindromeSubseq(String s) {

  int table[][] = new int[s.length()][s.length()];

  // length === 1;
  for (int i = 0; i < table.length; i++) {
      table[i][i] = 1;
  }

  // length === 2;
  for (int i = 0; i < table.length - 1; i += 1) {
      if (s.charAt(i) == s.charAt(i + 1)) {
          table[i][i + 1] = 2;
      } else {
          table[i][i + 1] = 1;
      }
  }

  // length > 2;
  for (int len = 3; len <= table.length; len += 1) {
      for (int i = 0; i + len <= table.length; i += 1) {
          char front = s.charAt(i);
          char end = s.charAt(i + len - 1);
          if (front == end) {
              table[i][i + len - 1] = 2 + table[i + 1][i + len - 2];
          } else {
              table[i][i + len - 1] = Math.max(table[i][i + len - 2], table[i + 1][i + len - 1]);
          }
      }
  }

  return table[0][table[0].length-1];
}
`;

export const description = `Given a string find the longest palindromic subsequence's length.`;

export const alUsecases = '';

export const example = `Example: 1
- Input: "abcdbab"
- Output: 5 // "abcba"

> PS: Result of Longest palindromic string: 3 // bab

Example: 2
- Input: "abdca"
- Output: 3 // "aba"

> PS: Result of Longest palindromic string: 1 // a
`;
