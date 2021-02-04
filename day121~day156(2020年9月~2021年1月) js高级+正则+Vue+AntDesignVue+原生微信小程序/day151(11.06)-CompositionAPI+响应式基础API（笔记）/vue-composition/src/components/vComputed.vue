<template>
  <div>
    <h3>computed</h3>
    <p>num1: {{ num1 }}</p>
    <p>num2: {{ num2 }}</p>
    <p>sum: {{ sum }}</p>
    <button @click="num1++">num1加一</button>
    <button @click="sum = 10">让sum等于10</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    let num1 = ref(1);
    let num2 = ref(2);
    let sum = computed({
      get() {
        return num1.value + num2.value;
      },
      set(val) {
        num1.value = val - num2.value;
      }
    });

    return {
      num1,
      num2,
      sum
    };
  }
};
</script>

<style>
</style>