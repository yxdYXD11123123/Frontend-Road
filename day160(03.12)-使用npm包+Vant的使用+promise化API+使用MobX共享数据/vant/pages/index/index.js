// index.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
// 导入共享库
import {store} from "../../store/store"

Page({
  data: {
    
  },
  onLoad() {
    createStoreBindings(this, {
      // 指定绑定的store
      store,
      // 指定要绑定的数据
      fields: ["numA", "numB", "sum"],
      // 指定要绑定的actions
      actions: ['updateNumA', "updateNumB"]
    })
  },
  /**
   * 加数字
   */
  addNum() {
    this.updateNumA(11)
    this.updateNumB(2)
  }
})
