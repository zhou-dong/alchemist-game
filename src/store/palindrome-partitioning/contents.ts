export const formula = `if (!isPalindrome(row, col)) {
  let min = sequence.length;
  for (let k = row; k < col; k++) {
    min = Math.min(min, table[row][k] + table[k + 1][col]);
  }
  table[row][col] = min + 1;
} else {
  table[row][col] = 0;
}`;

export const description = `Given a string s partition s such that every 
substring of the partition is a palindrome. Return 
the minimum cuts needed for a palindrome 
partitioning of s.`;

export const useCases = '';

export const example = `Input: "abbab"
Output: 1 // "abba", "b"`;
