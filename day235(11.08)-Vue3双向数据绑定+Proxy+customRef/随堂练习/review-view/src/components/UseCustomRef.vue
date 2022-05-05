<template>
  <div>
    <div>
      {{ data }}
    </div>
    <button @click="onClick">button</button>
  </div>
</template>

<script>
import { customRef } from "vue";

export default {
  setup(props) {
    // 可以在 set 和 get 时自定义行为
    const data = useDebouncedRef("data", 700);

    const onClick = () => {
      data.value += 1;
    };

    return {
      data,
      onClick,
    };
  },
};

function useDebouncedRef(value, delay) {
  return customRef((track, trigger) => {
    let timer = null;
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          trigger();
          value = newValue;
        }, delay);
      },
    };
  });
}
</script>

<style></style>
