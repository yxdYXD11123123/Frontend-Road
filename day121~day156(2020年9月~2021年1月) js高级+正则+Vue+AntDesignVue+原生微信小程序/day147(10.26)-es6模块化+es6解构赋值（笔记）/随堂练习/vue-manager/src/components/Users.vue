<template>
  <div class="users">
    <h3>用户管理页面</h3>
    <table>
      <thead>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td v-text="item.id"></td>
          <td v-text="item.name"></td>
          <td v-text="item.age"></td>
          <td class="details" @click="openDetails(item.id)">详情</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "dong",
          age: 18
        },
        {
          id: 2,
          name: "frank",
          age: 21
        },
        {
          id: 3,
          name: "老王",
          age: 19
        },
        {
          id: 4,
          name: "铁牛",
          age: 20
        }
      ]
    };
  },
  methods: {
    openDetails(id) {
      let user = this.list.filter(ele => ele.id == id)[0];
      this.$router.push({
        name: "details",
        params: { id, name: user.name }
      });
    }
  }
};
</script>

<style>
.details {
  cursor: pointer;
}
.details:hover {
  background-color: hotpink;
}
</style>