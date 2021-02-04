<template>
  <div class="todo">
    <!-- 输入框及搜索按钮 -->
    <div class="todo-header">
      <!-- 输入框-->
      <input type="text" placeholder="请输入任务" v-model="task" />
      <!-- 按钮 -->
      <button @click="addTask">添加事项</button>
    </div>
    <!-- 列表 -->
    <ul class="todo-main">
      <li v-for="item in filterList" :key="item.id">
        <input
          type="checkbox"
          :checked="item.done"
          @click="changeStatus(item.id)"
        />
        <span v-text="item.info"></span>
        <a href="" @click.prevent="delTask(item.id)">删除</a>
      </li>
    </ul>
    <!-- 底部菜单 -->
    <div class="todo-footer">
      <p>剩余 {{ unfinished }} 条未完成</p>
      <div class="todo-footer-button">
        <button
          :class="choosed == 'all' ? 'primary' : ''"
          @click="choosed = 'all'"
        >
          全&nbsp;&nbsp;部
        </button>
        <button
          :class="choosed == 'unfinished' ? 'primary' : ''"
          @click="choosed = 'unfinished'"
        >
          未完成
        </button>
        <button
          :class="choosed == 'finished' ? 'primary' : ''"
          @click="choosed = 'finished'"
        >
          已完成
        </button>
      </div>
      <a href="" @click.prevent="clearFinished">清除已完成</a>
    </div>
  </div>
</template>

<script>
// 引入共享库的map
const { mapState, mapActions, mapGetters } = require("vuex");

export default {
  data() {
    return {
      // 任务内容
      task: "",
      // 选择的viewkey 全部/未完成/已完成
      choosed: "all"
    };
  },
  created() {
    // 创建组件时获取list数据
    this.$store.dispatch("getList");
  },
  computed: {
    // 全部任务
    ...mapState(["list"]),
    // 未完成任务数量
    ...mapGetters(["unfinished"]),
    // 经过筛选的任务列表
    filterList() {
      if (this.choosed == "finished") {
        return this.list.filter(ele => ele.done == 1);
      } else if (this.choosed == "unfinished") {
        return this.list.filter(ele => ele.done == 0);
      } else {
        return this.list;
      }
    }
  },
  methods: {
    // 删除任务
    ...mapActions(["delTask", "clearFinished"]),
    // 添加任务
    addTask() {
      if (this.task.trim().length == 0) {
        alert("任务不能为空");
      } else {
        this.$store.dispatch("addTask", this.task);
      }
      this.task = "";
    },
    // 改变完成状态
    changeStatus(id) {
      this.$store.dispatch("changeStatus", {
        id,
        newStatus: event.target.checked
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.todo {
  margin: 0 auto;
  margin-top: 20px;
  width: 500px;
  min-height: 500px;
  box-sizing: border-box;
}

.todo-header {
  position: relative;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.todo-header input {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 5px;
  border-radius: 3px;
  vertical-align: text-bottom;
}

.todo-header button {
  border: none;
  outline: none;
  position: absolute;
  right: -100px;
  top: -2px;
  border-radius: 3px;
  width: 80px;
  height: 30px;
  background-color: rgb(64, 145, 247);
  line-height: 30px;
  color: #fff;
}

.todo-main {
  list-style: none;
  margin: 0;
  padding: 0;

  margin-top: 10px;
  border: 1px solid #ccc;
  line-height: 20px;
  text-align: left;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.todo-main li {
  border-top: 1px solid #ccc;
  padding: 10px 15px;
}

.todo-main li:first-child {
  border: none;
}
.todo-main li input {
  position: relative;
  top: 1px;
  margin-right: 5px;
}
.todo-main li a {
  float: right;
}
.todo-footer {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-top: none;
  height: 50px;
  overflow: hidden;
}

.todo-footer p {
  line-height: 50px;
}

.todo-footer-button button {
  border: none;
  margin-top: 10px;
  line-height: 24px;
  padding: 0 15px;
  padding-top: 2px;
  background-color: #fff;
  color: #333;
}

.todo-footer-button button:focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
}

.todo-footer-button button:first-child {
  border: 1px solid #ccc;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.todo-footer-button button:nth-child(2) {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  vertical-align: top;
}
.todo-footer-button button:last-child {
  border: 1px solid #ccc;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.todo-footer-button button.primary {
  background-color: rgb(69, 146, 239);
  color: #fff;
}

.todo-footer a {
  line-height: 50px;
}
</style>
