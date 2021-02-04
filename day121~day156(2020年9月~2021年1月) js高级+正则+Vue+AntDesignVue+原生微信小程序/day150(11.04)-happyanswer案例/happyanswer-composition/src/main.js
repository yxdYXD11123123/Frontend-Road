import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入公共样式
import "../public/css/common.scss";
// 导入rem插件
import "../public/js/rem";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
