<template>
  <div>
    <h2>Parent页面（二级路由）</h2>
    <!-- 子路由视图 占位符 -->
    <NuxtChild />
    <div>
      <nuxt-link to="/parent/child1">Child1</nuxt-link>
      <nuxt-link to="/parent/child2">Child2</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: "slide-fade",
  },
  middleware: "auth",
  created() {
    console.log("created");
  },
};
</script>

<style>
.parent-enter-active,
.parent-leave-active {
  transition: opacity 2s;
}

.parent-enter,
.parent-leave-to {
  opacity: 0;
}
</style>