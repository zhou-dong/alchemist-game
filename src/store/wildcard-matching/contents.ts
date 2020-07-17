export const formula = `if (p === '?' || p === t) {
  table[row][col] = table[row - 1][col - 1];
} else if (p === '*') {
  table[row][col] = table[row][col - 1] || table[row - 1][col];
} else {
  table[row][col] = false;
}`;

export const description = `
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.

- '?' Matches any single character. 
- '*' Matches any sequence of characters (including the empty sequence).

The matching should cover the ***entire*** input string (not partial). 
`;

export const alUsecases = '';

export const example = `
Empty string:

| STRING | PATTERN | MATCH |
|:------:|:-------:|:-----:|
|   ""   |   "*"   |  True |
|   ""   |   "?"   | False |

One Character:

| STRING | PATTERN | MATCH |
|:------:|:-------:|:-----:|
|   "a"  |   "?"   |  True |
|   "a"  |   "*"   |  True |

Two Characters:

| STRING | PATTERN | MATCH |
|:------:|:-------:|:-----:|
|  "ab"  |   "*"   |  True |
|  "ab"  |   "?"   | False |
|  "ab"  |   "??"  |  True |
|  "ab"  |   "**"  |  True |
|  "ab"  |   "?a"  | False |
|  "ab"  |   "?b"  |  True |
|  "ab"  |  "???"  | False |
|  "ab"  |  "***"  |  True |
|  "ab"  |  "a*b"  |  True |
|  "ab"  |  "a?b"  | False |
`;
