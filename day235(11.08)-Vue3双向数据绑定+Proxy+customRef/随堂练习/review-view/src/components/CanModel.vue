<template>
  <div>
    <div>双向绑定组件</div>
    <div>{{ modelValue }}</div>
    <button @click="onClick">更新数据</button>
  </div>
</template>

<script>
export default {
  // 接受默认名为modelValue的props
  props: ["modelValue"],
  setup(props, { emit }) {
    const onClick = () => {
      // 触发默认名为 update:modelValue 的自定义事件，即可更新
      emit("update:modelValue", "new some");
    };

    return {
      onClick,
    };
  },
};
</script>

<style></style>
