const func1 = (message: any): any => {
  console.log(message);
};

const any1 = func1('any');

// console.log(any1.toString());

console.log(any1);

const obj: any = {};

// const any2 = obj.a.b.c;

// console.log(any2);

const func2 = (obj: any) => {
  const num1: number = obj.num;
  const num2 = num1 + 1;

  return num2;
};

const any3 = func2({ num: 1 });

console.log(any3);
