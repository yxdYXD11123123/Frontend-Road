<template>
  <div>
    <h3>图书管理：VueX 练习</h3>
    <p>共有 {{ nums }} 本书</p>
    <table border="1" cellpadding="5">
      <thead>
        <th>id</th>
        <th>书名</th>
        <th>价格</th>
        <th>操作</th>
        <th>异步操作</th>
      </thead>
      <tbody>
        <tr v-for="item in books" :key="item.id">
          <td v-text="item.id"></td>
          <td v-text="item.name"></td>
          <td v-text="item.price"></td>
          <td><a href="" @click.prevent="removeBook(item.id)">删除</a></td>
          <td>
            <a href="" @click.prevent="removeBookAfterSeconds(item.id)"
              >2秒删除</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 引入 vuex
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    // 方式一：通过实例身上的$store对象中的state对象获取数据状态
    // books() {
    //   return this.$store.state.books;
    // }
    // 方式二：通过es6的扩展运算符将store对象中的state和getters放到这里
    ...mapState(["books"]),
    ...mapGetters(["nums"])
  },
  methods: {
    // 方式一：通过$store的commit方法执行vuex中mutations的方法（第一个参数是方法名，后面的参数是给方法传递的参数）
    // removeBook(id) {
    //   this.$store.commit("removeBook", id);
    // }
    // 通过$store的dispatch方法执行vuex中actions的方法（第一个参数是方法名，后面的参数是给方法传递的参数）
    // removeBookAfterSeconds(id) {
    //   this.$store.dispatch("removeBookAfterSeconds", id);
    // },
    // 方式二：
    ...mapMutations(["removeBook"]),
    ...mapActions(["removeBookAfterSeconds"])
  }
};
</script>

<style>
table {
  text-align: center;
}
</style>
