type BookType = {
  title: string;
  price: number;
};

const bookType: BookType = {
  title: 'TypeScript',
  price: 10000,
};

console.log(bookType);

interface IBook {
  title: string;
  price: number;
  author?: string;
  readonly language: string;
}

const book: IBook = {
  title: 'TypeScript',
  price: 10000,
  language: 'korean',
};

console.log(book);

// book.language = 'english';

interface ISeries extends IBook {
  seriesNumber: number;
}

const series: ISeries = {
  title: 'TypeScript',
  price: 10000,
  language: 'korean',
  seriesNumber: 1,
};

console.log(series);
