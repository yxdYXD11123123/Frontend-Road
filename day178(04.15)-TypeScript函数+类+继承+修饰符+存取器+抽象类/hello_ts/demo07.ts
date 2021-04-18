class ClassOne {
  // 将属性私有化
  private name: string
  constructor(name: string) {
    this.name = name;
  }
  // 使用存取器
  public get getName(): string {
    return this.name;
  }

  public set setName(v: string) {
    this.name = v;
  }
}

let obj = new ClassOne("rank");
// 注意：使用get、set关键字后，用法不是调用方法的方式
// get时，直接使用 对象.get方法名
console.log(obj.getName); // rank
// set时，直接使用 对象.set方法名 = 新值
obj.setName = "dong";
console.log(obj.getName); // dong
