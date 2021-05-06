<template>
  <div>
    <!-- 第一题  -->
    <One></One>
    <!-- 第二题 -->
    <Two></Two>
    <!-- 第三题 -->
    <Three></Three>
    <!-- 第四题 -->
    <Four></Four>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// 引入第一题
import One from "./components/One.vue";
import Two from "./components/Two.vue";
import Three from "./components/Three.vue";
import Four from "./components/Four.vue";

export default defineComponent({
  name: "App",
  components: {
    One,
    Two,
    Three,
    Four,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
