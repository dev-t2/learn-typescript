interface IRectangle {
  width: number;
  height: number;
  getArea: () => number;
}

class Rectangle implements IRectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(10, 20);

console.log(rectangle.getArea());
