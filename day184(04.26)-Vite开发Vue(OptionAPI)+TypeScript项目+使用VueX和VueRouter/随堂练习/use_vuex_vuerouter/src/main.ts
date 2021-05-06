import { createApp } from 'vue'
import App from './App.vue';
// 引入路由
import router from "./routes/index";
// 引入共享库
import { store } from "./stroe/index";

createApp(App).use(router).use(store).mount('#app');
