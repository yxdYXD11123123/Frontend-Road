namespace spaceTwo {
  let a;
  // 命名空间导出数据后
  export let params = "s";
}

namespace spaceTwo {
  let a;
  // 其他同名命名空间可以直接使用 上面数据 params
  export function fn() {
    console.log(params);
  }
}

spaceTwo.fn(); // s