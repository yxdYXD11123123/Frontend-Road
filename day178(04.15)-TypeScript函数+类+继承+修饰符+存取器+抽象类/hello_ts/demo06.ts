// 定义一个抽象类（特殊的基类）
abstract class SpeicalFather {
  public name: string
  constructor(name: string) {
    this.name = name;
  }
  // 声明一个抽象方法（此方法，派生类中必须实现）
  abstract makeMoney(): void
}
// 继承一个抽象类
class Son extends SpeicalFather {
  constructor(name: string) {
    super(name);
  }
  // makeMoney必须实现，不然报错
  makeMoney() {
    console.log("抽象基类要求我必须实现此方法");
  }
}

let richSon = new Son('frank');
console.log(richSon); // Son { name: 'frank' }
richSon.makeMoney(); // 抽象基类要求我必须实现此方法

