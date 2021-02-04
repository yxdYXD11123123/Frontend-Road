import { createApp } from "vue";
import App from "./App.vue";
// 引入路由
import router from "./routes";
// 创建实例
let app = createApp(App);
// 把路由挂载到实例上
app.use(router);
// 绑定
app.mount("#app");
