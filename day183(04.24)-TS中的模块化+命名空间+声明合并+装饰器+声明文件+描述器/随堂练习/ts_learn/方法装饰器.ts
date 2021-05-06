
/**
 * 方法装饰器
 * @param target 类 或者 实例
 * @param propertyKey 被绑定方法的名字
 * @param descriptor 被绑定方法的属性描述符
 */
function decoratorFn(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
  // 使用描述符 替换原来的方法
  descriptor.value = function () {
    console.log("我是被篡改的方法");
  }
}


class People {
  @decoratorFn  // 对于动态方法，target就是对象
  fnOne() {
    console.log("我是fnOne");
  }

  @decoratorFn  // 对于静态方法，target就是类
  static fnTwo() {
    console.log("我是fnTwo");
  }
}

People.fnTwo() // 我是被篡改的方法
new People().fnOne()  // 我是被篡改的方法