import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: "/users",
    name: "users",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 懒加载（存储代码块，但是不执行，当我们访问路由时才会执行，加载组件）
    component: () => import("../components/Users.vue")
  },
  {
    path: '/goods',
    component: () => import('../components/Goods.vue')
  },
  {
    path: '/orders',
    component: () => import('../components/Orders.vue')
  },
  {
    path: '/rights',
    component: () => import('../components/Rights.vue')
  },
  {
    path: '/details/:id',
    name: 'details',
    component: () => import('../components/Details.vue'),
    props: (router) => ({ id: router.params.id, name: router.params.name })
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
