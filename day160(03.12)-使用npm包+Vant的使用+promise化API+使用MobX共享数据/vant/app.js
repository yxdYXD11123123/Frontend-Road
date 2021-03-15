// 导入wxp
import {wxp} from "./utils/wxp"

// app.js
App({
  onLaunch() {
    
    // 展示本地存储能力
    wxp.getSystemInfo().then((res)=>{console.log(res);})
  },
  globalData: {
    userInfo: null
  }
})
