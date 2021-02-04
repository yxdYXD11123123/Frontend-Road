// 路由文件

// 引入vue-router
import * as VueRouter from "vue-router";

// 导入组件
import HelloVue from "../components/HelloWorld.vue";
import About from "../components/About.vue";

// 设置路由
const routes = [
    { path: "/", component: HelloVue },
    { path: "/about", component: About }
];

// 创建路由
const router = VueRouter.createRouter({
    routes,
    // 是使用 URL 中的 hash（#）部分去创建路由
    history: VueRouter.createWebHashHistory()
});
// 导出路由
export default router;
