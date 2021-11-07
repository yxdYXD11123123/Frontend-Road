<template>
  <!-- 碎片组件 -->
  <div>helloWorld：{{ msg }}</div>
  <button @click="onClick">button</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["msg"],
  // 添加 emits
  emits: ["changeMsg"],
  setup(props, { emit }) {
    const onClick = () => {
      emit("changeMsg", "子组件修改");
    };

    return {
      onClick,
    };
  },
};
</script>
