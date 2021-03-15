// components/newCom/newCom.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
  behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum'
    },
    actions: {
      buttonTap: 'updateNumA'
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updateNum() {
      this.buttonTap(1)
    }
  }
})
