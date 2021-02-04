// components/newBtn/newBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    aname: {
      type: String,
      value: ""
    }
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
    clickBtn() {
      console.log(this.properties.aname);
      this.setData({
        aname: '新按钮名'
      });
    }
  },
  observers: {
    aname(val) {
      console.log(val);
    }
  }
})
