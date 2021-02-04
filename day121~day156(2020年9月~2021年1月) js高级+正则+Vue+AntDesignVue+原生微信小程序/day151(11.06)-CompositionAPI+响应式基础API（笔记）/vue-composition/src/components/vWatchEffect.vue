<template>
  <div>
    <h3>{{ num }}</h3>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    let num = ref(0);

    setInterval(() => {
      num.value += 1;
    }, 1000);

    // watchEffect 是一个方法，它有一个返回值也是一个方法，
    // 可以停止跟踪依赖的变化
    let stropFn = watchEffect(() => {
      console.log("响应式追踪其依赖---" + num.value);
    });

    setTimeout(() => {
      // 中止
      stropFn();
    }, 8000);

    return {
      num
    };
  }
};
</script>

<style>
</style>