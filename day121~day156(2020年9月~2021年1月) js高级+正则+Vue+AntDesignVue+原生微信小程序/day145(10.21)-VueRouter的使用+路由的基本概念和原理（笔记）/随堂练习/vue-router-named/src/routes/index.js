// 引入插件
import * as VueRouter from "vue-router";

// 准备组件
import index from "../components/Index";
import personal from '../components/Personal'

// 配置路由
const routes = [
  { path: "/", component: index },
  // 命名路由：给路由命名为personal
  { path: '/personal/:uname/:id', name: "personal", component: personal, props: true }
];

// 创建路由
const router = VueRouter.createRouter({
  routes,
  // 使用hash路由的浏览历史
  history: VueRouter.createWebHashHistory()
});

// 导出路由
export default router;
