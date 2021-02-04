import { createApp } from "vue";
import App from "./App.vue";
// 引入vuex创建的store共享库
import store from "./store";
// 引入antd
// import antD from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

createApp(App)
  .use(store)
  // .use(antD)
  .mount("#app");
