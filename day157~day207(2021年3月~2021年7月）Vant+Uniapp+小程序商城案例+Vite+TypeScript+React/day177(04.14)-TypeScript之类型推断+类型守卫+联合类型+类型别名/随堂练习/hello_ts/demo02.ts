// 非空断言
// 例一
let x: undefined | string;
changeX()
let res: string = x!;
function changeX() {
  x = '1';
}

// 例二
function fn1(str: string | null | undefined) {
  // let res: string = str; // 报错 Type 'undefined' is not assignable to type 'string'.
  let res: string = str!; // okay 
}