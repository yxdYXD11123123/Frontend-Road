<template>
  <div class="box">
    <div>我是一个子组件</div>
    <!-- 将弹出框传送到body标签下，避免样式影响 -->
    <Teleport to="body">
      <div class="modal">弹出框</div>
    </Teleport>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box {
  width: 500px;
  height: 500px;
  background-color: aquamarine;
  /* 这里的transform会影响子组件的fixed定位 */
  transform: translate(3px);
}

.modal {
  position: fixed;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: beige;
}
</style>
