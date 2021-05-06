<template>
  <div class="total">
    <span>总价：{{ price }}</span>
    <button>结算</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<{ price: number; num: number }[]>,
      required: true,
    },
  },
  setup(props) {
    let price = computed(() => {
      let sum = 0;
      props.list.forEach((val) => {
        sum += val.price * val.num;
      });
      return sum;
    });

    return {
      price,
    };
  },
});
</script>

<style>
</style>