// components/indexSearch/indexSearch.js
Component({
  /**
   * 组件的初始数据
   */
  data: {
    searchInputing: false,
    searchKey: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    searchInput(e){
      this.setData({
        searchKey: e.detail.value
      })
    }
  },
  /**
   * 监听器
   */
  observers: {
    'searchKey': function(val){
      this.setData({
        searchInputing: val.length==0?false:true
      })
    }
  }
})
