import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { backgroundColor: "#c80" }
  },
  {
    path: "/about/:some",
    // name: "About",
    meta: { islogin: true, backgroundColor: 'grey' },
    props: (route) => {
      return { queryAndParams: { query: route.query, params: route.params } }
    },
    // 确认路由之前
    beforeEnter() {
      console.log("路由单独配置 before Enter");
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 跳转路由前
router.beforeEach((to, from, next) => {
  console.log("全局 beforeEach", "是否需要鉴权", to.meta);
  next();
})

// 解析之后
router.beforeResolve((to, from, next) => {
  console.log("全局 beforeResolve, 这里完成了组件解析");
  next();
})

// 进入组件后
router.afterEach(() => {
  console.log("全局 afterEach");
})

export default router;
