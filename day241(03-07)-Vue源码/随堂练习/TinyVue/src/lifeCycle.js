import { Watcher } from "./observe/watcher";
import { patch } from "./vdom/patch";

// 挂载组件
export function mountComponent(vm) {
  // 更新组件
  function updateComponent() {
    // 调用render方法 生成虚拟DOM的根节点，调用_update
    vm._update(vm._render());
  }

  // 调用创建前hook
  callHook(vm, "beforeCreate");

  // 为组件创建 Watcher，将更新组件的方法交给 Watcher， 由Watcher控制 更新渲染
  new Watcher(updateComponent);

  // 挂载完成
  callHook(vm, "mounted");
}

export function lifeCycleMixin(TinyVue) {
  // 给原型添加 update方法
  TinyVue.prototype._update = function (vnode) {
    // 将虚拟节点，渲染成真实DOM,
    // 并更新 $el指向
    this.$el = patch(this.$el, vnode);
  };
}

// 调用生命周期函数
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  // 如果有生命周期函数回调函数，就遍历执行
  handlers && handlers.forEach((fn) => fn.call(vm));
}
