export const formula = `// length === 1;
for (let i = 0; i < table.length; i++) {
  table[i][i] = true;
}

// length === 2;
for (let i = 0; i < table.length - 1; i++) {
  if (sequence.charAt(i) === sequence.charAt(i + 1)) {
    table[i][i + 1] = true;
  } else {
    table[i][i + 1] = false;
  }
}

// length > 2;
for (let len = 3; len <= table.length; len++) {
  for (let i = 0; i + len <= table.length; i++) {
    const front = sequence.charAt(i);
    const end = sequence.charAt(i + len - 1);
    if (front === end) {
      table[i][i + len - 1] = table[i + 1][i + len - 2];
    } else {
      table[i][i + len - 1] = false;
    }
  }
}`;

export const description = `Given a string, find the length of longest 
palindromic substring.`;

export const alUsecases = '';

export const example = `
- Input: "dbcdcd"
- Output: 3
- Note: "cdc", "dcd" with length 3`;
