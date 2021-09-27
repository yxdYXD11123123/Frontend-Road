interface userInfoInterface {
  name: string,
  age?: number,
  readonly gender?: string
};

let getUserInfo = (obj: userInfoInterface) => {
  if (obj.age) {
    console.log(obj.name + "=====", obj.age);
  }
  if (obj.gender) {
    // obj.gender = "1";  // 不可修改
    console.log(obj.gender); // 男
  }
}

getUserInfo({ name: "frank", gender: "男" });

// 定义接口
interface SumFn {
  // 参数列表: 返回值类型
  (...rest: number[]): number;
}

// 按照接口 声明函数 
let fn: SumFn = (num1, num2) => {
  return num1 + num2;
}

// 类型别名 方式
type SumFnType = (...rest: number[]) => number;

let fn2: SumFnType = () => { return 1 };