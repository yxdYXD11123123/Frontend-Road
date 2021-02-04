import { createRouter, createWebHashHistory } from "vue-router";

// 导入首页
import Index from "../views/Index";

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  // 首页
  {
    path: "/index",
    component: Index
  },
  // 答题页
  {
    path: "/answer",
    component: () => import("../views/Answer")
  },
  // 得分页
  {
    path: "/score",
    component: () => import("../views/Score")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
