// 引入vue router 插件
import * as VueRouter from "vue-router";

// 引入组件
import HomePage from "../components/HomePage";
import AboutPage from "../components/AboutPage";
import SettingPage from '../components/SettingPage';
import MusicPage from '../components/MusicPage';

// 配置路由
const routes = [
  // 重定向  当我们访问/时，自动跳转到/home
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: HomePage,
    children: [
      {
        path: "setting",
        component: SettingPage
      },
      {
        path: "music",
        component: MusicPage
      }
    ]
  },
  { path: "/about", component: AboutPage }
];

// 设置路由
const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory()
});

// 导出路由
export default router;
