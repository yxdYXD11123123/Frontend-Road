<template>
  <div>
    <button v-has:[xxx]="'读取权'" v-if="show">读取</button>
    <button v-has:[xxx]="'删除权'">删除</button>
    <button v-has:[xxx]="'修改权'" @click="show = true">修改</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permissions: ["修改权", "读取权"],
      xxx: "xxx信息",
      show: false,
    };
  },
  directives: {
    has: {
      created(el, binding) {
        // 获取参数数据，添加到元素中
        el.innerText += binding.arg;
        // binding.instance   当前组件实例
        if (!binding.instance.permissions.includes(binding.value)) {
          // 没有当前权限，隐藏按钮
          el.style.display = "none";
        }
      },
    },
  },
};
</script>

<style>
</style>