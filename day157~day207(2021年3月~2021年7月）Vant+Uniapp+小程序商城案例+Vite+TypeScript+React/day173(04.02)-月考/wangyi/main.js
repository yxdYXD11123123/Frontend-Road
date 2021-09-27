import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount();

// 导入请求包
import { $http } from '@escook/request-miniprogram';
// 挂载
uni.$http = $http;
// 配置基准地址
$http.baseUrl = 'https://netease-cloud-music-api-sand-three.vercel.app'

