<template>
  <div>
    <router-link to="/login">login</router-link>
    <!-- :id（动态路径参数）可以用$route.params.id直接接收 -->
    <h2>This is User id为{{ $route.params.id }}</h2>
    <!-- 路由中props开启后，可以用props接收 -->
    <p>id 为 {{ id }} ， 名字为 {{ name }}</p>
    <button @click="printParams">点我</button>
  </div>
</template>

<script>
export default {
  props: ["id", "name"],
  methods: {
    printParams() {
      console.log(this.$route.params);
    }
  }
};
</script>

<style></style>
