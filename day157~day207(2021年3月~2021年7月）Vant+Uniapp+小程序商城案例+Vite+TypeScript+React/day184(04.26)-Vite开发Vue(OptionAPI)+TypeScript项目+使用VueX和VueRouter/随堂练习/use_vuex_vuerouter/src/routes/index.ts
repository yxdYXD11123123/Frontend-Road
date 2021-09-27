import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../pages/Home/index.vue";
// vue-router中自带d.ts  所以这里写的代码都会有类型推断
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    }
  ]
})


// 导出
export default router;