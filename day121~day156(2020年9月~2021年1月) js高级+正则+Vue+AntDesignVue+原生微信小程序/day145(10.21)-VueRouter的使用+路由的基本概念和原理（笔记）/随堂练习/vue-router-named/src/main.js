import { createApp } from "vue";
import App from "./App.vue";
// 导入路由
import router from "./routes";
// 创建实例
let app = createApp(App);
// 挂载路由
app.use(router);
// 绑定
app.mount("#app");
