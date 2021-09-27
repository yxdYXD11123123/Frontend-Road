let foo = 123;
// foo = "123"; // 报错，因为ts推断这里是number

// 函数返回值
function add(a: number, b: number) {
  return a + b;
}
// ts会推断 add():number
// 所以
// let str: string = add();  // 报错