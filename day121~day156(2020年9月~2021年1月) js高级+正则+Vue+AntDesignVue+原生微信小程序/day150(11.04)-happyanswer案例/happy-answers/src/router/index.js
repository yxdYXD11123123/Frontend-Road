import { createRouter, createWebHashHistory } from "vue-router";

import Index from '../views/Index.vue';

const routes = [
  // 重定向到首页
  {
    path: '/', redirect: '/index'
  },
  // 首页路由
  {
    path: '/index', component: Index
  },
  // 答题页路由
  {
    path: '/questions', component: () => import('../views/Questions.vue')
  },
  // 分数页
  {
    path: '/score', component: () => import('../views/Score.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
