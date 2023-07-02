class Parent {
  public publicValue = 'publicValue';
  protected protectedValue = 'protectedValue';
  private privateValue = 'privateValue';

  check() {
    console.log(this.publicValue);
    console.log(this.protectedValue);
    console.log(this.privateValue);
  }
}

const class1 = new Parent();

class1.check();

console.log();

class Child extends Parent {
  check() {
    console.log(this.publicValue);
    console.log(this.protectedValue);
  }
}

const class2 = new Child();

class2.check();
