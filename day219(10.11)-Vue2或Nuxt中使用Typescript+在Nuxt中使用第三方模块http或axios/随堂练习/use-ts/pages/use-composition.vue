<template>
  <div>
    <h2>使用 Composition API</h2>
    <div>{{ count }}</div>
    <button @click="countIncrease">加</button>
    <button @click="countDecrease">减</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

const useCounter = () => {
  const count = ref(0);

  const countIncrease = () => {
    count.value += 1;
  };

  const countDecrease = () => {
    count.value -= 1;
  };

  return {
    count,
    countIncrease,
    countDecrease,
  };
};

export default defineComponent({
  setup() {
    return {
      ...useCounter(),
    };
  },
});
</script>

<style>
</style>