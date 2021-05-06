<template>
  <div class="total">
    <span>总价：{{ price }}</span>
    <button>结算</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { product } from "../../types/interfaces";

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    price(): number {
      let sum = 0;
      this.list.forEach((val: product) => {
        sum += val.price * val.num;
      });
      return sum;
    },
  },
});
</script>

<style>
</style>