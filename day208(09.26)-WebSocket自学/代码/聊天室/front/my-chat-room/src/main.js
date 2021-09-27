import { createApp } from 'vue'
import App from './App.vue';
// 重置样式
import "./assets/css/reset.css";
// 公共样式
import "./assets/css/common.css";
// antD样式
import "ant-design-vue/dist/antd.css";



// 引入 路由
import router from "./routes";


createApp(App).use(router).mount('#app')
