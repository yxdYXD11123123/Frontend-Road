import Vue from 'vue'
import App from './App';
// 导入共享库
import store from "./store/store.js";

Vue.config.productionTip = false

App.mpType = 'app';

const app = new Vue({
    ...App,
	// 使用共享库
	store
});
app.$mount();

// 导入请求包
import { $http } from '@escook/request-miniprogram'
// 挂载包
uni.$http = $http;
// 设置基准地址
$http.baseUrl = "https://www.uinav.com";
// 设置请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title:"加载中..."
	});
	// 当用户的请求地址中 带有my 时，说明用户已经有了token，需要在请求头中带上Authorization
	if (options.url.indexOf('/my/') !== -1) {
	    options.header = {
	      'Authorization': store.state.storeUserInfo.token,
	    }
	 }
}
// 设置响应拦截器
$http.afterRequest = function() {
	uni.hideLoading();
}

// 设置提示器
uni.$showMsg = function(title) {
	uni.showToast({
		icon:"none",
		title
	})
}

