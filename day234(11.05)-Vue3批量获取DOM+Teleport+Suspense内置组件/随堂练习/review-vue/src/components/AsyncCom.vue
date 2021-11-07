<template>
  <div>异步组件</div>
</template>

<script>
export default {
  async setup() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    return {};
  },
};
</script>

<style></style>
