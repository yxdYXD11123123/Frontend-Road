import { observe } from "./observe";
import { isFunction } from "./utils";

export function initState(vm) {
  // 获取开发者选项
  const options = vm.$options;
  // 判断 data 是否存在
  if (options.data) {
    // 初始化 data
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  // 如果data值为函数，调用获取数据，并且要注意调用时的this指向
  // 因为开发者可能会在给 data 传递函数时，在函数内部使用this，所以要提供vm实例
  data = vm._data = isFunction(data) ? data.call(vm) : data;
  // 遍历data中数据
  for (let key in data) {
    // 代理data中属性
    proxy(vm, key, "_data");
  }
  // 进入数据劫持
  observe(data);
}

/**
 * 代理 source 属性到 target 目标对象
 * @param target 目标对象
 * @param key
 * @param source
 */
function proxy(target, key, source) {
  Object.defineProperty(target, key, {
    get() {
      return target[source][key];
    },
    set(newValue) {
      target[source][key] = newValue;
    },
  });
}
