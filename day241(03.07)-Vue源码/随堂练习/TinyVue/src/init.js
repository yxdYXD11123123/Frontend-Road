import { compileToFunction } from "./compiler";
import { initState } from "./initState";
import { mountComponent } from "./lifeCycle";
import { mergeOptions, nextTick } from "./utils";

// 初始化混入
export function initMixin(TinyVue) {
  // Vue原型添加_init 初始化函数函数
  TinyVue.prototype._init = function (options) {
    // 给实例上挂载配置选项，方便实例其它方法使用
    this.$options = mergeOptions(this.constructor.options, options);
    // 数据初始化，传递 实例this
    initState(this);
    // 挂载
    if (options.el) {
      this.$mount(options.el);
    }
  };

  // Vue原型添加 $mount 挂载函数
  TinyVue.prototype.$mount = function (el) {
    // 获取真实 el 的 DOM，挂载到vue实例上
    this.$el = document.querySelector(el);
    // 获取模板
    let options = this.$options;
    let template;
    // 判断是否存在render, 如果存在render就不需要解析模板，可以直接渲染虚拟DOM
    if (!options.render) {
      // 如果没有render，获取template配置选项
      template = options.template;
      // 如果还没有，获取 el 指定元素
      if (!template) {
        // 获取整个vue模板（使用outerHTML）
        template = this.$el.outerHTML;
      }
      // 将模板解析为 render 函数，挂载到 实例的optins上
      options.render = compileToFunction(template);
    }
    // 挂载组件，传递this实例
    mountComponent(this);
  };

  // 添加 $nextTick
  TinyVue.prototype.$nextTick = nextTick;
}
