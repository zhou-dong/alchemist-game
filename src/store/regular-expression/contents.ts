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
} else {
  table[row][col] = false; 
}`;

export const description = `
Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

 - '.' Matches any single character. 
 - '*' Matches zero or more of the preceding element. 

The matching should cover the entire input string (not partial). 
`;

export const alUsecases = '';
export const example = `
| PATTERN |          TRUE          |      FALSE     |
|:-------:|:----------------------:|:--------------:|
|   a*b   |      b, ab, aab, aaab     |    a, abb, acb   |
|   a.b   |       aab, abb, acb      |     a, ab , b     |
|  c*a.b  | aab, caab, ccaab, cccaab, cccabb, cccacb | baab, cab, cabbb |
`;
