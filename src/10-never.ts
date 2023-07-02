const getError = (message: string): never => {
  throw new Error(message);
};

const failure = () => {
  return getError('Failed');
};

const infinityLoop = (): never => {
  while (true) {}
};

declare const str1: string;

if (typeof str1 !== 'string') {
  str1;
}

declare const str2: string | number;

if (typeof str2 !== 'string') {
  str2;
}
