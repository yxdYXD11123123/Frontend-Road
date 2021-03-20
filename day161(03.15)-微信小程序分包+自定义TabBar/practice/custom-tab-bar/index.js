// custom-tab-bar/index.js
// 自定义tabBar组件

// 导入共享库
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../store/store"

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ["tabBarActive"],
    actions: ['updateTabBarActive']
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
        "pagePath": "pages/index/index",
        "color": "#000000",
        "selectedColor": "#44a8a8",
        "text": "主页"
      },
      {
        "pagePath": "pages/one/one",
        "color": "#000000",
        "selectedColor": "#44a8a8",
        "text": "one"
      },
      {
        "pagePath": "pages/two/two",
        "color": "#000000",
        "selectedColor": "#44a8a8",
        "text": "two"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      // 切换状态
      this.updateTabBarActive(e.currentTarget.dataset.index)
      // 切换页面
      wx.switchTab({
        url: "/" + e.currentTarget.dataset.path
      })
    }
  }
})
