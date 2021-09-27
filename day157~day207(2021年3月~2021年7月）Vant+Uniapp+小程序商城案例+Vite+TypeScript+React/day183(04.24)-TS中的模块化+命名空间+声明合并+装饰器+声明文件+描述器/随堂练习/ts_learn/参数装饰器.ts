/**
 * 参数装饰器
 * @param target 实例或类
 * @param propertyKey 参数所在的方法 方法名
 * @param parameterIndex 参数在参数列表中的索引位置 
 */
function paramsDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(target); // 实例 或 类
  console.log(propertyKey); // run
  console.log(parameterIndex); // 1 
}


class Cat {
  // 给参数绑定装饰器
  static run(name: string, @paramsDecorator age: number) {
    console.log(name + "is" + age);
  }
}