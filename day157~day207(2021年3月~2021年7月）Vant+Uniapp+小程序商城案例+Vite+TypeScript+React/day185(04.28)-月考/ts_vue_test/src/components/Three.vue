<template>
  <div>
    <h2>第三题</h2>
    <div id="app" class="main">
      <h2>小目标列表</h2>
      <div>
        <h3>添加小目标</h3>
        <input
          type="text"
          class="text-keyword"
          placeholder="输入小目标后，按回车确认"
          v-model="inputValue"
          @keyup.enter="addTask"
        />
        <p>
          共有{{ list.length }}个目标，已完成{{ finished }}，还有{{
            unFinished
          }}条未完成
        </p>
      </div>
      <ul>
        <li class="li1" v-for="item in list" :key="item.id">
          <div>
            <span
              :class="{ 'type-span': true, checked: item.done }"
              @click="item.done = !item.done"
            ></span>
            <span>{{ item.title }}</span>
            <span class="close" @click="delTask(item.id)">X</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    // 任务列表
    const list = ref([
      {
        id: 1,
        title: "HTML5",
        done: false,
      },
      {
        id: 2,
        title: "CSS3",
        done: false,
      },
      {
        id: 3,
        title: "Vue",
        done: false,
      },
    ]);

    // 输入框的值
    const inputValue = ref("");

    // 添加任务
    const addTask = () => {
      // 判断是否为空
      if (inputValue.value.trim().length != 0) {
        // 添加任务
        list.value.push({
          id: +new Date(),
          title: inputValue.value,
          done: false,
        });
      } else {
        alert("请输入目标内容");
      }
      // 清空
      inputValue.value = "";
    };

    // 已完成数量
    const finished = computed(() => {
      return list.value.filter((val) => val.done).length;
    });

    // 未完成数量
    const unFinished = computed(() => {
      return list.value.filter((val) => !val.done).length;
    });

    // 删除
    const delTask = (id: number) => {
      console.log(id);
      console.log(list.value);

      list.value = list.value.filter((val) => val.id != id);
    };

    // 返回
    return {
      list,
      addTask,
      inputValue,
      finished,
      unFinished,
      delTask,
    };
  },
});
</script>

<style scoped>
body {
  font-family: "微软雅黑";
  font-size: 14px;
}

input {
  font-size: 14px;
}

body,
ul,
div,
html {
  padding: 0;
  margin: 0;
}

.hidden {
  display: none;
}

.main {
  width: 800px;
  margin: 0 auto;
}

li {
  list-style-type: none;
  line-height: 40px;
  position: relative;
  border: 1px solid transparent;
  padding: 0 20px;
}

li .type-span {
  display: block;
  width: 10px;
  height: 10px;
  background: #ccc;
  margin: 14px 10px 0 0;
  float: left;
}

li .close {
  position: absolute;
  color: #f00;
  font-size: 20px;
  line-height: 40px;
  height: 40px;
  right: 20px;
  cursor: pointer;
  display: none;
  top: 0;
}

li:hover {
  border: 1px solid #09f;
}

li:hover .close {
  display: block;
}

li .text-keyword {
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
  margin-left: 10px;
  width: 80%;
  display: none;
}

.text-keyword {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  outline: none;
}

li .checked {
  background-color: #09f;
}
</style>