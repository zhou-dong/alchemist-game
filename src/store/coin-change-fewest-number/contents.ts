export const formula = `if (coin > col) {
  table[row][col] = table[row - 1][col];
} else {
  table[row][col] = Math.min(
    table[row][col - coin] + 1, 
    table[row - 1][col]);
}`;

export const description = `You are given coins of different denominations and a total amount 
of money amount. Find the fewest number of coins that you need to 
make up that amount. If that amount of money cannot be made up by 
any combination of the coins, return -1.`;

export const useCases = '';
export const example = '';
