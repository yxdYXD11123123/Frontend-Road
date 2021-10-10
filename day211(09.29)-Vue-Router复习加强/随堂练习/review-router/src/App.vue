<template>
  <div>
    <!-- 如果路由配置背景色，优先使用，否则使用默认颜色 -->
    <div id="nav" :style="{ backgroundColor: bgColor || '#ccc' }">
      <router-link to="/">Home</router-link> |
      <router-link
        :to="{
          path: '/about/sss',
          query: { what: 'what' },
        }"
      >
        About
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    // 背景色
    const bgColor = computed(() => route.meta.backgroundColor);

    return {
      bgColor,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
