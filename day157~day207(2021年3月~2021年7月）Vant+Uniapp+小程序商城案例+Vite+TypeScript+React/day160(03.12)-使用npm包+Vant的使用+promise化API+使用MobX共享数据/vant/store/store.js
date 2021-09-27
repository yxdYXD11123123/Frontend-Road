// store.js
// 按需导入第三方包observable, action
import { observable, action } from 'mobx-miniprogram'

// 创建实例对象并将其导出
export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,

  // 计算属性
  // 在计算属性的方法前，必须加get修饰符，代表sum的值是只读的，无法进行修改
  // 计算属性sum 依赖于numA和numB的值，因此sum函数的返回值就是最终的值
  get sum() {
    return this.numA + this.numB
  },

  // actions
  // 定义actions方法，用来修改store中的数据
  updateNumA: action(function (step) {
    this.numA += step;
  }),
  updateNumB: action(function (step) {
    this.numB += step;
  })
})