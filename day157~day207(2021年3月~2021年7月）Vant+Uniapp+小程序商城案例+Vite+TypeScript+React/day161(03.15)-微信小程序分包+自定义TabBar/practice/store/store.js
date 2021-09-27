// 引入
import {observable, action} from "mobx-miniprogram";

// 创建共享库并导出
export const store = observable({
  // 数据字段
  tabBarActive: 0,
  // actions
  updateTabBarActive: action(function (cur) {
    this.tabBarActive = cur;
  })
})