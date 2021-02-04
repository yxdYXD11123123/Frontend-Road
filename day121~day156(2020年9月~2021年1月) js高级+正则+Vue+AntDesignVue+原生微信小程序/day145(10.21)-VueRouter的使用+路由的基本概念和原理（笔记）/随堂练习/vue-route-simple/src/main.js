import { createApp } from "vue";
import App from "./App.vue";
// 创建实例
const app = createApp(App);
// 导入路由
import router from "./routes";
// 把路由挂载到app实例上
app.use(router);
// 绑定
app.mount("#app");
