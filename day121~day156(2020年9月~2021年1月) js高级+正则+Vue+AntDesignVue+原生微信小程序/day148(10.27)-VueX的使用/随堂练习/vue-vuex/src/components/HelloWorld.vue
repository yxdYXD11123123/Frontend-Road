<template>
  <div class="hello">
    <h3>我叫{{ name }}, 我今年{{ age }}岁了</h3>
    <!-- 在组件中可以使用 this.$store.commit('方法名',参数...) 执行mutations中的方法 -->
    <button @click="$store.commit('add')">点我通过commit执行mutations</button>
    <button @click="add">点我</button>
    <div>
      <input
        type="text"
        v-model="newName"
        @blur="$store.commit('changeName', newName)"
      />
    </div>
    <div>
      新名字：
      <input type="text" v-model="newName" @blur="actionsChangeName(newName)" />
    </div>
    <p v-text="showAge"></p>
    <div>
      <button @click="handleName">点我通过dispatch执行actions</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      newName: ""
    };
  },
  computed: {
    // name() {
    //   return this.$store.state.name;
    // },
    // age() {
    //   return this.$store.state.age;
    // }
    ...mapState(["name", "age"]),
    ...mapGetters(["showAge"])
  },
  methods: {
    ...mapMutations(["add", "changeName"]),
    ...mapActions(["actionsChangeName"]),
    handleName() {
      this.$store.dispatch("actionsChangeName", this.newName);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
