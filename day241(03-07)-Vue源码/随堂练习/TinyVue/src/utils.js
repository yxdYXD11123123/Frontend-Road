export function isFunction(value) {
  return typeof value === "function";
}

// 判断参数是否为引用类型
export function isObject(value) {
  return typeof value === "object" && value !== null;
}

// 判断参数是否时数组
export function isArray(value) {
  return Array.isArray(value);
}

// 缓存 回调函数
let callbacks = [];
let waiting = false;

function flushCallbacks() {
  callbacks.forEach((callback) => callback());
  // 恢复状态
  callbacks.length = 0;
  waiting = false;
}

export function nextTick(callback) {
  // 将回调函数先缓存起来
  callbacks.push(callback);
  // 经过一轮同步代码，到了微任务 才会执行一次
  if (!waiting) {
    waiting = true;
    // 添加微任务，执行本轮同步代码收集到的全部 $nextTick 回调函数
    Promise.resolve().then(flushCallbacks);
  }
}

const strategy = {};
const lifeCycles = ["beforeCreate", "created", "beforeMount", "mounted"];

lifeCycles.forEach((lifeCycle) => {
  // 将生命周期函数 合并 为 函数数组
  strategy[lifeCycle] = function (currentValue, mixinValue) {
    if (mixinValue) {
      if (currentValue) {
        return currentValue.concat(mixinValue);
      } else {
        if (isArray(mixinValue)) {
          return mixinValue;
        }
        return [mixinValue];
      }
    } else {
      if (isArray(currentValue)) {
        return currentValue;
      }
      return [currentValue];
    }
  };
});

// 合并options
export function mergeOptions(currentOptions, mixinOptions) {
  const options = {};

  // 遍历当前options
  for (const key in currentOptions) {
    // 添加 键值对
    mergeKey(key);
  }

  // 遍历 mixinOptions
  for (const key in mixinOptions) {
    // 添加 没有的键值对
    if (!currentOptions.hasOwnProperty(key)) {
      mergeKey(key);
    }
  }

  function mergeKey(key) {
    const concatFunc = strategy[key];
    if (concatFunc) {
      options[key] = concatFunc(currentOptions[key], mixinOptions[key]);
    } else {
      // options中的键 优先赋值 mixin 中的值
      options[key] = mixinOptions[key] || currentOptions[key];
    }
  }

  return options;
}
