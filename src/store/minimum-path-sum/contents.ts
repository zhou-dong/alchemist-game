export const formula = `table[row][col] = table[row][col] + Math.min(
  table[row - 1][col], 
  table[row][col - 1]
);`;

export const description = `Given a m x n grid filled with non-negative 
numbers, find a path from top left to bottom 
right which minimizes the sum of all numbers 
along its path.

Note: You can only move either down or right 
at any point in time. 
`;

export const useCases = '';
export const example = '';
