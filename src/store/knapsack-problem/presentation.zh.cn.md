# 🎒背包问题

今天我们讲背包问题。首先什么是背包问题？背包问题可以描述为：给定N件物品和一个限定最大承受重量背包，每种物品都有自己的重量weight(w)和价格value(v)，如何选择最合适的物品放置于给定的背包中，才能使背包中物品的总重量小于等于背包的最大承受重量，同时使得背包中物品的价值最高。

PS：背包问题有很多种，我们今天讲的是0/1背包问题，就是说每种物品只能选择0次或1次。每种物品不能被选择多次也不可以被拆开选择。

## 转移方程：
```javascript
if (itemWeight > knapsackWeight) {
  table[row][col] = table[row - 1][col];
} else {
  table[row][col] = Math.max(
    table[row - 1][col], 
    table[row - 1][knapsackWeight - itemWeight] + itemValue
  );
}
```
or
```javascript
if (item.weight > knapsack.weight) {
  table[row][col] = getPreviousValue(row, col);
} else {
  table[row][col] = Math.max(getPreviousValue(row, col), getUpdatedValue(row, knapsack, item));
}

const getPreviousValue = (row, col) => {
  return table[row - 1][col];
};

const getUpdatedValue = (row, knapsack, itemWeight, itemValue) => {
  return table[row - 1][knapsack.weight - item.weight] + item.value;
}
```

然后它的计算原理/转移方程的意思是：
- 当物品的重量大于当前背包的最大承受重量的时，这件物品不能被放入背包中，所以保持copy原先背包中物品的总价值。
- 反之，当物品的重量小于等于当前背包的最大承受重量的时候，我们从下面两个值中选一个最大值，第一个是指这个物品没有放入背包以前背包中物品的总价值，第二个是指从背包中减去这个物品重量的对应物品的价值，再加上物品的价值。

## Go Through an Example:

可能公式写的或者我讲的不是很清楚，下面咱们通过一个例子来更加详细的理解一下怎么计算背包问题。

在这个例子里面，我们有4件物品，然后背包的最大承受重量是6。首先我们为了计算方便，添加了两排0，但是它们也有它们的意义：
- 竖的一排0是说：当背包的最大承受重量为0时，它不能装任何物品，所以背包中物品的总价值只能为0。
- 横的一排0是说：当把一个重量为0，价值也为0的的物品装进背包中，背包的中物品的总价值仍然是0.

然后咱们从物品1开始。
