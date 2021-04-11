// 引入vuex
import Vuex from "vuex";
// 挂载vue
import Vue from 'vue'
Vue.use(Vuex);
// 导入modules
import storeCart from "./storeCart.js";
import storeUserInfo from "./storeUserInfo.js"

// 创建共享库 并导出
export default new Vuex.Store({
	// 开启严格模式
	// 我们使用vuex中的state数据时，如果不通过mutation方法，直接去更改state值，
	// 其实也可以更改数据，甚至还可以实时响应，但是这样会导致数据追踪出问题，
	// 所以开启严格模式，让state数据必须在mutation方法下去更新，否则报错
	strict: true,
	modules: {
		// 购物车共享库
		storeCart: storeCart,
		storeUserInfo: storeUserInfo
	}
})
