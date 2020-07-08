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

export const alUsecases = '';
export const example = `
Greedy Algorithm Does not Always Give Optimal Solution. For instance:

1. Non optimal solution using Greedy Algorithm:
    - Given: Coins = {1, 8, 13}, 16 cents = ?
    - Greedy solution: **4 coins: 13 + 1 + 1 + 1**
    - Optimal solution: **2 coins: 8 + 8**

2. Can not result a solution using Greedy Algorithm:
    - Given: Coins = {2, 8, 15}, 24 cents = ?
    - Greedy solution: **no solution: coins: 15 + 8 + ? **
    - Optimal solution: **3 coins: 8 + 8 + 8**
`;
