// components/BtnWithIcon/BtnWithIcon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconClass: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    badge: {
      type: String,
      value: ""
    }
  },
    /**
   * 配置选项
   */
  options: {
    // 设置组件外部样式可以影响组件内部
    styleIsolation: "apply-shared"
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

})
