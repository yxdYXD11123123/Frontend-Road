import { mergeOptions } from "./utils";

export function initGlobalAPI(TinyVue) {
  TinyVue.options = {};
  TinyVue.mixin = function (options) {
    // 这里的this 还是 TinyVue
    this.options = mergeOptions(this.options, options);
  };
}
