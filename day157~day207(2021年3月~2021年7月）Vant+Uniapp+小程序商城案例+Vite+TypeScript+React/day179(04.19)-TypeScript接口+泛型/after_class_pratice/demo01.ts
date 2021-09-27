// 用户信息接口
interface UserInterface {
  userName: string,
  hobby?: string[]
};


// 使用接口
function printUsername(user: UserInterface) {
  console.log(user.userName);
  console.log(user.hobby); // string[] | undefined
  user.hobby?.forEach((val) => { console.log(val); })
}

printUsername({ "userName": "frank", hobby: ["篮球"] })


// 使用interface规范函数类型
interface fnInterface {
  // 参数列表           返回值类型
  (a: string, b: number): string;
}

let fn: fnInterface = (x, y) => {
  return x + y;
}

console.log(fn("1", 1));

// 或者使用 type 实现规范
type fnType = (str: string) => string

let fn2: fnType = (str: string) => {
  return str;
}

// 使用类实现interface
abstract class AClass implements UserInterface {
  abstract userName: string
}

class SonClass extends AClass {
  userName: string
  constructor(userName: string) {
    super();
    this.userName = userName;
  }
}

let son = new SonClass("frank");
console.log(son.userName);

// 使用泛型
function genericsFn<T>(arr: T[]) {
  console.log(typeof arr[0]);

  return arr
}


genericsFn([1, 2]).forEach((val) => {
  console.log(val.toFixed(2));
})