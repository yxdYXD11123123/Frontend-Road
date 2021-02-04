// 引入vue router 插件
import * as VueRouter from "vue-router";

// 引入组件
import LoginPage from "../components/LoginPage";
import UserPage from "../components/UserPage";
import ByInput from "../components/LoginByInputPage";
import ByEr from "../components/LoginByER";

// 配置路由
const routes = [
  {
    path: "/login",
    component: LoginPage,
    // 嵌套路由
    // 注意只要加上了 '/' 例如：/xxx ，访问时都是
    children: [
      // 通过 /byinput 访问
      { path: "/byinput", component: ByInput },
      // 通过 /login/byer 访问
      { path: "byer", component: ByEr, alias: "/" }
    ]
  },
  {
    // 路由传参
    path: "/user/:id",
    component: UserPage,
    // props设为true :id（动态路径中的参数）即可被组件中props属性接收到
    // props: true
    // props也可以设为回调函数（默认参数是$router）
    props: router => ({ id: router.params.id, name: "dong" })
  }
];

// 设置路由
const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory()
});

// 导出路由
export default router;
