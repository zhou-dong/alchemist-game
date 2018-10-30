export const formula = `if (p === '?' || p === t) {
  table[row][col] = table[row - 1][col - 1];
} else if (p === '*') {
  table[row][col] = 
    table[row][col - 1] || table[row - 1][col];
}`;

export const description = `'?' Matches any single character. 
'*' Matches any sequence of characters (including the empty sequence). 
The matching should cover the entire input string (not partial). 
`;

export const useCases = '';
export const example = `"aa","a" → false
"aa","aa" → true
"aa", "*" → true
"aa", "a*" → true
"ab", "?*" → true
"aab", "c*a*b" → false
`;
