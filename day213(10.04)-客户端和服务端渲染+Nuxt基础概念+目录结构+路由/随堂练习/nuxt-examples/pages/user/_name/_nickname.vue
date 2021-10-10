<template>
  <div>
    <!-- 使用params获取name和nickname -->
    <span> 用户昵称{{ $route.params.nickname }} </span>
    <span> 用户姓名{{ $route.params.name }} </span>
    <span>查询参数 {{ $route.query.age }}</span>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>