function propsDecorator(target: any, propertyKey: string) {
  console.log(target); // 实例
  console.log(propertyKey); // color
  // 给实例上添加属性
  target.newProps = 'newProps';
}

function staticPropsDecorator(target: any, propertyKey: string) {
  console.log(target); // 类
  console.log(propertyKey); // belong
  // 给类上添加属性
  target.newStaticProps = 'newStaticProps';
}

class Dog {
  // 装饰一个动态属性
  @propsDecorator
  private color = "red"

  // 装饰一个静态属性
  @staticPropsDecorator
  static belong = '动物';
}


let dog = new Dog();
// console.log(dog.newProps); // newProps
// console.log(Dog.newStaticProps); // newStaticProps

