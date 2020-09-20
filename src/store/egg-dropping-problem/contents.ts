export const formula = `if (eggs > floors) {
    table[eggs][floors] = table[eggs - 1][floor];
} else {
    let min = floors;
    for (let floor = 1; f <= floors; floor += 1) {
        const max = Math.max(
            table[eggs - 1][floor - 1], // egg breaks
            table[eggs][floors - floor] // egg didn't break
        );
        min = Math.min(min, max);
    }
    table[eggs][floors] = 1 + min;
}`;

export const description = `Objec­tive: There are ***n*** number of eggs and building 
which has ***k*** floors. Write an algorithm to find 
the minimum number of drops is required to know 
the floor from which if egg is dropped, it will 
break.

Notes:
One trial is – dropping an egg once from the particular floor.

- If egg does not break after dropping, will be used again.
- If egg breaks when dropped from some floor then it will break if dropped from any higher floor.
- If egg does not break when dropped from some floor 
then it will not break if dropped from any lower floor
`;

export const alUsecases = '';
export const example = `
Example 1:
- Input: Eggs: 1, Floors: K.
- Output: K.

Example 2:
- Input: Egss: Infinity, Floors: K.
- Output: lg(K).
`;
