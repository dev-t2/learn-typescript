function func1<T>(message: T) {
  console.log(message);
}

const func2 = <T>(message: T) => {
  console.log(message);
};

func1(1);
func2<string>('2');

interface IUser<T> {
  id: T;
}

const user: IUser<number> = {
  id: 1,
};

console.log(user);

interface ILength {
  length: number;
}

function func3<T extends ILength>(message: T) {
  console.log(message);
}

func3('TypeScript');
func3([1, 2, 3]);
func3({ length: 4 });

// func3(5);
