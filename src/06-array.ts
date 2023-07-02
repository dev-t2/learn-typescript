const arr1: number[] = [1, 2, 3];

const arr2: Array<number> = [4, 5, 6];

const arr3 = [7, 8, 9];

const arr4 = [...arr1, ...arr2, ...arr3];

console.log(...arr4);

const arr5: (number | string)[] = [1, '2', 3];

console.log({ arr5 });

const users1: { id: number }[] = [{ id: 0 }, { id: 1 }, { id: 2 }];

const users2: Array<{ id: number }> = [{ id: 4 }, { id: 5 }, { id: 6 }];

console.log({ users1, users2 });
