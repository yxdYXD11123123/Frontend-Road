const user = {};

Object.defineProperty(user, "name", {
  value: "张山",
  configurable: false,
});

console.log(Object.getOwnPropertyDescriptors(user, "name"));

// {
//     name: { value: '张三', writable: true, enumerable: true, configurable: true }
// }
