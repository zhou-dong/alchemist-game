export const formula = `if (ch1 === ch2 && table[row - 1][col - 1]) {
  table[row][col] = true
} else {
  table[row][col] = table[row][col - 1]
}`;

export const description = `Given a string s and a string t, 
check if s is subsequence of t.`;

export const alUsecases = '';
export const example = '';
