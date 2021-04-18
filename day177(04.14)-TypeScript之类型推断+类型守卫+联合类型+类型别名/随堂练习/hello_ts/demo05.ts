// 声明 鸭子类型（即 由当前方法和属性的集合决定的类型）
// 也就是有a属性和a1属性的对象，就是属于A鸭子的

// interface就是在 typeScript中 充当 duck typing 这样的角色
// 是一种 规定内外代码契约 的有力方式
interface A {
  a: number;
  a1: string;
}
interface B {
  b: string;
}

// 要求params参数属于A类型或B类型
function doStuff(params: A | B) {
  // 如果 params中有a属性的话，可以推断出 params 是A类型
  if ('a' in params) {
    // 所以按照鸭子类型params一定有a1属性
    console.log(params.a1);
  }
  else {
    // 不是A类型就一定是B类型，所以就一定有b属性
    console.log(params.b);
  }
}

doStuff({ b: '2' }) // 2