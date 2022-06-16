import { isObject } from "./utils";
import { createElement, createText } from "./vdom";

// 混入渲染相关函数
export function renderMixin(TinyVue) {
  // 创建元素类型的虚拟DOM
  TinyVue.prototype._c = function () {
    return createElement(this, ...arguments);
  };
  // 创建文本类型的虚拟DOM
  TinyVue.prototype._v = function (text) {
    return createText(this, text);
  };
  // 创建插值类型的虚拟DOM
  TinyVue.prototype._s = function (value) {
    // 判断是否是对象，如果是对象转为字符串，如果是文本直接返回
    return isObject(value) ? JSON.stringify(value) : value;
  };

  // 给Vue原型添加 _render 方法
  TinyVue.prototype._render = function () {
    // 调用 拼接好的 render 函数
    const { render } = this.$options;
    // 传递this作用域
    return render.call(this);
  };
}
