/**
 * 路由配置
 */

import { createRouter, createWebHistory } from "vue-router"
// 导入 首页
import Home from "@/pages/Home/index.vue";

const route = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      component: Home
    },
    {
      path: "/chat",
      component: () => import("@/pages/Chat/index.vue")
    }
  ]
})

export default route;