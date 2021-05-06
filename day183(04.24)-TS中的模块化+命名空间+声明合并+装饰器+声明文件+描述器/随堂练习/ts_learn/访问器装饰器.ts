// 声明 装饰器工厂 （可以自定义参数）
function getterDecorator(value: string) {
  // 返回装饰器
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target); // 实例
    console.log(propertyKey); // 访问器名
    console.log(descriptor); // 注意：这里拿到的是get\set，而不是value\writable, 所以拿不到value值
    // 替换原有的getter和setter
    descriptor.get = function () {
      return this.value + value;
    }
    descriptor.set = function (val) {
      console.log(`在设置${propertyKey}值`);
      this.value = val;
    }
  }
}

class Person {
  private name: string
  constructor(name: string) {
    this.name = name;
  }

  // 使用装饰器工厂（传入参数）
  @getterDecorator('-----装饰器添加的内容')
  public get _name(): string {
    return this.name;
  }

  public set _name(v: string) {
    this.name = v;
  }
}

let zs = new Person("zs");
// 因为descriptor中拿不到value值，所以第一次是undefined
console.log(zs._name);  // undefined-----装饰器添加的内容 （获取值时触发了 替换后的getter）

zs._name = '新名字'; // 在设置_name值 （修改值时触发了 替换后的setter）

console.log(zs._name);  // 新名字-----装饰器添加的内容


