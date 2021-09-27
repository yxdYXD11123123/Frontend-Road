namespace spaceOne {
  let a = "2";
  const b = 1;
  // 导出之后
  export function fn() {
    console.log("我是spaceOne的fn");
  }

}

// spaceOne.a // 报错
// 外界才可以访问到
spaceOne.fn()