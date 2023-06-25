console.log(Symbol('Hello') === Symbol('Hello'));

const key = 'key';

const sym = Symbol();

const obj = {
  key: 'Key Value',
  [sym]: 'Symbol Value',
};

console.log({ obj });

console.log(obj.key);

console.log(obj[sym]);
