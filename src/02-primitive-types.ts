const num1: number = 1;
const num2: bigint = 12345679n;

console.log({ num1, num2 });

const str: string = 'TypeScript';

console.log({ str });

const bool: boolean = true;

console.log({ bool });

const value1: undefined = undefined;
const value2: null = null;

console.log({ value1, value2 });

const sym1: symbol = Symbol('symbol');
const sym2: symbol = Symbol('symbol');

console.log({ sym1, sym2 });
console.log(sym1 === sym2);
