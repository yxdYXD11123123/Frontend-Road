<template>
  <div>
    <h3>{{ state.count }}</h3>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  setup() {
    let state = reactive({ count: 0 });
    // A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.
    // 只能监听 computed或者ref或者reactive或者是放这些类型的数组
    let stop = watch(state, () => {
      console.log("count变了");
    });

    setInterval(() => {
      state.count++;
    }, 1000);

    // 6秒后停止监听
    setTimeout(() => {
      stop();
    }, 6000);

    return {
      state
    };
  }
};
</script>

<style>
</style>