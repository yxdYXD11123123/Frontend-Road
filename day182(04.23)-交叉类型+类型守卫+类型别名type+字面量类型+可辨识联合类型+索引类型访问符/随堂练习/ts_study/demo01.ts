let a: number | string | boolean;

type ObjType = {
  a: string
}

type ObjType2 = {
  b: number
}

// 交叉类型
let obj: ObjType & ObjType2;
obj = {
  a: "1",
  b: 1
}


let getNewObj = <T, U>(target: T, source: U): T & U => {
  // 类型断言，断言res是 T&U 类型
  // let res = {} as (T & U);

  // 或者不要写 {} 初始值
  let res: (T & U);
  res = Object.assign(target, source);
  return res;
}

console.log(getNewObj<ObjType, ObjType2>({ a: '1' }, { b: 1 })); // { a: '1', b: 1 }


