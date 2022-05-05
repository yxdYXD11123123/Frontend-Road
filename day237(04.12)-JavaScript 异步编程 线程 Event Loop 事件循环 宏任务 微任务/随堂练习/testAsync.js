// 声明一个 async函数
//（
//  async函数 其实只是一个 new promise 的语法糖，
//  所以，async函数 中 遇到await 之前，所有的同步代码，相当于 在 new Promise(()=>{}) 回调函数中直接写的代码，会被同步执行
// ）
const asyncFn = async () => {
  let sum = 1;
  for (let i = 0; i < 100000000; i++) {
    sum += i * i * i;
  }
  // await 之前的代码还是会同步执行
  console.log(sum, "async方法 but 同步执行（await之前的代码）");
  await 1; // 遇到await，会等待后面的Promise.resolve后，或者 封装为Promise.resolve
  // 然后：await后面 要执行的代码 才被排入 事件循环的微任务队列中
  console.log("await之后的代码");
  await 1;
  for (let i = 0; i < 100000000; i++) {
    sum += i * i * i;
  }
  console.log(sum, "async");
};

// 声明一个普通函数
const fn = () => {
  let sum = 1;
  for (let i = 0; i < 100000000; i++) {
    sum += i * i * i;
  }
  console.log(sum);
};

// 先调用异步，再调用同步
asyncFn();
process.nextTick(() => {
  console.log(
    "插入一个nextTick微任务, nextTick微任务会在promise.then微任务之前执行"
  );
});
fn();

// 2.4999999500004043e+31 async方法 but 同步执行（await之前的代码）
// 2.4999999500004043e+31
// 插入一个nextTick微任务
// await之后的代码
// 4.999999899997056e+31 async
