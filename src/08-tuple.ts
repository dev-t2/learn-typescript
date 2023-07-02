let tuple: [number, string] = [1, '2'];

// tuple = ['1', 2];
// tuple[2] = 3;

console.log({ tuple });
console.log(typeof tuple);

type CallbackType = (value: number) => void;

const useState = (initialNumber: number): [number, CallbackType] => {
  return [initialNumber, (value) => console.log(initialNumber + value)];
};

const [state, setState] = useState(1);
