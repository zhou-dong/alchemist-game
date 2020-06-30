export const formula = `if (itemWeight > currentWeight) {
  table[row][col] = table[row - 1][col];
} else {
  table[row][col] = Math.max(
    table[row - 1][col],
    table[row - 1][currentWeight - itemWeight] + itemValue
  );
}
`
;

// npm i -D @types/webpack-env
export const description = require.context(`!raw-loader!./`, false, /\.md$/, )("./description.zh.cn.md").default;

// export const description = `Given weights and values of n items, put these items in a knapsack
// of capacity W to get the maximum total value in the knapsack.

// V: value, W: Weight
// `;

export const alUsecases = '';
export const example = '';
