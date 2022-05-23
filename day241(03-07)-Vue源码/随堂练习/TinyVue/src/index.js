import { compileToFunction } from "./compiler";
import { initGlobalAPI } from "./global-api";
import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifeCycle";
import { renderMixin } from "./render";
import { createEle, patch } from "./vdom/patch";

// TinyVue 构造函数
function TinyVue(options) {
  this._init(options);
}

// 混入初始化功能
initMixin(TinyVue);
// 混入渲染代码
renderMixin(TinyVue);
// 混入生命周期代码
lifeCycleMixin(TinyVue);
// 初始化全局API
initGlobalAPI(TinyVue);

export default TinyVue;

// 手动创建 vm1 实例
const vm1 = new TinyVue({
  data: {
    msg: "hello TinyVue1",
  },
});

// 将模板解析为渲染函数
const render1 = compileToFunction(
  `<ul><li key="A">A</li><li key="B">B</li><li key="C">C</li><li key="D">D</li></ul>`
);
// 调用函数 生成虚拟节点
const oldVNode = render1.call(vm1);
// 生成真实DOM
const oldDOM = createEle(oldVNode);
// 插入页面
document.body.appendChild(oldDOM);

// 手动创建 vm2 实例
const vm2 = new TinyVue({
  data: {
    msg: "hello TinyVue2",
  },
});

// 将模板解析为新的渲染函数
const render2 = compileToFunction(
  `<ul><li key="E">E</li><li key="A">A</li><li key="C">C</li><li key="B">B</li><li key="F">F</li></ul>`
);
// 调用函数 生成新的虚拟节点
const newVNode = render2.call(vm2);

setTimeout(() => {
  // 调用path方法，传入新旧虚拟Dom 更新组件
  patch(oldVNode, newVNode);
}, 1500);
