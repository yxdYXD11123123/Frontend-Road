class Person {
  // 属性
  name: string
  // 构造方法
  constructor(name: string) {
    // 初始化属性值（必须）
    this.name = name;
  }
  // 方法
  study(hours: number): void {
    console.log("学习了" + hours + "个小时");
  }
}

let pdd = new Person("PDD");
console.log(pdd.name); // PDD
pdd.study(3); // 学习了3个小时
