const username: string = 'TypeScript';
const age: number = 35;
const isSuccess: boolean = true;

console.log({ username, age, isSuccess });

const info: {
  username: string;
  age: number;
  isSuccess: boolean;
  gender?: string;
} = {
  username: 'TypeScript',
  age: 35,
  isSuccess: true,
};

console.log(info);

const printMessage = (message: string, isPrint?: boolean) => {
  if (isPrint) {
    console.log({ message });
  }
};

printMessage('Print Message');
