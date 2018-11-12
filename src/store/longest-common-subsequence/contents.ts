export const formula = `if (a === b) {
  table[row][col] = table[row - 1][col - 1] + 1
} else {
  table[row][col] = Math.max(
    table[row][col - 1], table[row - 1][col]
  )
}`;

export const description = `Given two sequences, find the length of longest 
subsequence present in both of them. A subsequence 
is a sequence that appears in the same relative 
order, but not necessarily contiguous. `;

export const useCases = '';

export const example = `“abc”, “abg”, “bdf”, “aeg”, ‘”acefg”, .. etc 
are subsequences of “abcdefg”.`;
