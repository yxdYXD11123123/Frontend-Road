// 引入vue-router
import * as VueRouter from 'vue-router';

// 准备组件
import Index from '../components/Index.vue';
import Private from '../components/Private.vue';

import Recommend from '../components/Recommend.vue';

// 设置路由
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '/ranks',
        component: () => import('../components/Ranks.vue')
      },
      {
        path: '/recommend',
        component: Recommend,
        alias: ''
      }
    ]
  },
  {
    path: '/private/:aname/:bname',
    // 为路由命名
    name: 'private',
    component: Private,
    // 允许用props接收参数
    props: true
  }
]

// 配置路由
const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory()
})

// 导出路由
export default router;