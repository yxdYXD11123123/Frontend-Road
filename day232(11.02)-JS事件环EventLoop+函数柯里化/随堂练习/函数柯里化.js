function add(a, b) {
  return a + b;
}

// 柯里化
function addCurry(a) {
  return function (b) {
    return a + b;
  }
}

console.log(add(5, 5));
console.log(addCurry(5)(5));

// 用来 封装校验类型函数
function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

// 柯里化 某个函数
const curry = (fn) => {
  const inner = (args = []) => {
    console.log(args);
    return fn.length === args.length ? fn(...args) : (...newArgs) => inner([...args, ...newArgs])
  }
  return inner()
}


console.log(curry(isType)("String")('1')); // true