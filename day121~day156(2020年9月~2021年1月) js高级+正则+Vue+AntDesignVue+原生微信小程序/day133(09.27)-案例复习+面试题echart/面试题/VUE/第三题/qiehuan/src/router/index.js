import Vue from "vue";
import VueRouter from "vue-router";
import One from "../views/One.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: One,
    meta:{
      index:'1'
    }
  },
  {
    path: "/two",
    component: () => import("../views/Two.vue"),
    meta:{
      index:'2'
    }
  },
  {
    path: "/three",
    component: () => import("../views/Three.vue"),
    meta:{
      index:'3'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
