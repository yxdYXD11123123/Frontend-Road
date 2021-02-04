import { createApp } from "vue";
import App from "./App.vue";
// 引入包
// 引入样式文件
// import
import store from "./store";

createApp(App)
  .use(store)
  .mount("#app");
