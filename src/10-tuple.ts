let tuple: [number, string] = [1, '2'];

// tuple = ['1', 2];
// tuple[2] = 3;

console.log({ tuple });
console.log(typeof tuple);

type CallbackType = (value: number) => void;

const useState: [number, CallbackType] = [1, (value) => console.log(value)];

const [state, setState] = useState;
