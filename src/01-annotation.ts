const str: string = 'TypeScript';
const num: number = 15;
const bool: boolean = true;

console.log({ str, num, bool });

const obj: {
  str: string;
  num: number;
  bool?: boolean;
} = {
  str: 'TypeScript',
  num: 15,
};

console.log(obj);

const func = (str: string, bool?: boolean): void => {
  console.log({ str, bool });
};

func('TypeScript');
