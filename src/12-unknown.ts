declare const anyValue: any;
declare const unknownValue: unknown;

// const num1: number = anyValue;

// console.log(num1);

// const num2: number = unknownValue;

// Type Guard
if (typeof unknownValue === 'number') {
  const num2: number = unknownValue;

  console.log(num2);
}
