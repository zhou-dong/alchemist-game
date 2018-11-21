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
      table[i][i + len - 1] = Math.max(
        table[i][i + len - 2], table[i + 1][i + len - 1]);
    }
  }
}`;

export const description = `Given a string find the longest palindromic subsequence's length.`;

export const useCases = '';

export const example = `1:
Input: "abbab"
Output: 4 // "abba"

2:
Input: "abdca"
Output: 3 // "aba"`;
