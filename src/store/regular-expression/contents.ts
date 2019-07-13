export const formula = `const p = pattern.charAt(col - 1);
const prev = pattern.charAt(col - 2);

if (p === '.' || p === t) {
  table[row][col] = table[row - 1][col - 1];
} else if (p === '*') {
  if (table[row][col - 2] === true) {
    table[row][col] = true
  } else if (prev === '.' || prev === t) {
    table[row][col] = table[row - 1][col];
  }
}`;

export const description = `'.' Matches any single character. 
'*' Matches zero or more of the preceding element. 
The matching should cover the entire input string (not partial). 
`;

export const alUsecases = '';
export const example = `'aa','a' → false
'aa','aa' → true
'aa', 'a*' → true
'aa', '.*' → true
'ab', '.*' → true
'aab', 'c*a*b' → true
`;
