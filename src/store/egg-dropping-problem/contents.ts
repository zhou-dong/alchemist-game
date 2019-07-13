export const formula = `if (row + 1 > col) {
    table[row][col] = table[row - 1][col];
} else {
    let min = floors;
    for (let f = 1; f <= col; f += 1) {
        const max = Math.max(
            table[row - 1][f - 1],
            table[row][col - f]
        );
        min = Math.min(min, max);
    }
    table[row][col] = 1 + min;
}`;

export const description = `Objec­tive: There are n number of eggs and building 
which has k floors. Write an algorithm to find 
the minimum number of drops is required to know 
the floor from which if egg is dropped, it will 
break.

Notes:
One trial is – dropping an egg once from the particular floor.

If egg does not break after dropping, will be 
used again.

If egg breaks when dropped from some floor then 
it will break if dropped from any higher floor.

If egg does not break when dropped from some floor 
then it will not break if dropped from any lower floor
`;

export const alUsecases = '';
export const example = '';
