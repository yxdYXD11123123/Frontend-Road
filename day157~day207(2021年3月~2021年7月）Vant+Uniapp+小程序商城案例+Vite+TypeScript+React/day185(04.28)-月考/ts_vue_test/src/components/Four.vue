<template>
  <div>
    <h2>第四题</h2>

    <div id="app" class="container">
      <h3>留言板:</h3>
      <div class="form-group" style="max-height: 300px; overflow: auto">
        <div
          class="row list-group-item"
          v-for="item in filterList"
          :key="item.id"
        >
          <div class="col-md-1">{{ item.nickname }}:</div>
          <div class="col-md-5">{{ item.content }}</div>
          <div class="col-md-2">{{ getTime(item.date) }}</div>
          <div class="col-md-4">
            <button class="btn btn-danger" type="button" @click="del(item.id)">
              删除
            </button>
            <button class="btn btn-info" type="button" @click="edit(item.id)">
              修改
            </button>
          </div>
        </div>
      </div>
      <br /><br /><br />
      <!-- 发表 -->
      <form class="form-horizontal" v-if="!editing">
        <div class="form-group">
          <label for="search" class="col-sm-1 control-label">搜索</label>
          <div class="col-sm-11">
            <input
              type="text"
              class="form-control"
              id="search"
              placeholder="搜索留言"
              v-model="searchKey"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="nikename" class="col-sm-1 control-label">昵称</label>
          <div class="col-sm-11">
            <input
              type="text"
              class="form-control"
              id="nikename"
              placeholder="请输入昵称"
              v-model="inputValueName"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="content" class="col-sm-1 control-label">内容</label>
          <div class="col-sm-11">
            <textarea
              id="content"
              class="form-control"
              rows="3"
              v-model="inputValueContent"
            ></textarea>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-success col-sm-1 col-sm-push-9"
          @click="add"
        >
          发表
        </button>
        <button
          type="button"
          class="btn btn-danger col-sm-1 col-sm-push-10"
          @click="clear"
        >
          清屏
        </button>
      </form>
      <!-- 修改 -->
      <form class="form-horizontal" v-else>
        <input type="hidden" :value="currentEditId" ref="hide" />
        <div class="form-group">
          <label class="col-sm-1 control-label">修改：</label>
          <div class="col-sm-11">
            <textarea
              class="form-control"
              rows="3"
              v-model="editvalue"
            ></textarea>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-success col-sm-1 col-sm-push-11"
          @click="sureEdit"
        >
          确认修改
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    // 修改 、 发表状态
    const editing = ref(false);

    // 留言列表
    const list = ref([
      {
        id: 1,
        nickname: "笑话",
        content: "今天天气真好",
        date: new Date(),
      },
      {
        id: 2,
        nickname: "小草",
        content: "是呀，那咱们出去晒太阳吧",
        date: new Date(),
      },
    ]);

    // 处理时间
    const getTime = (date: Date) => {
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;
    };

    // 昵称
    const inputValueName = ref("");

    // 内容
    const inputValueContent = ref("");

    // 添加留言
    const add = () => {
      if (
        inputValueName.value.trim().length != 0 &&
        inputValueContent.value.trim().length != 0
      ) {
        list.value.push({
          id: +new Date(),
          nickname: inputValueName.value.trim(),
          content: inputValueContent.value.trim(),
          date: new Date(),
        });
      } else {
        alert("写全了！");
      }
      // 清空
      inputValueName.value = "";
      inputValueContent.value = "";
    };

    // 删除留言
    const del = (id: number) => {
      list.value = list.value.filter((val) => val.id != id);
    };

    // 修改输入框
    const editvalue = ref("");
    // 记录id
    const currentEditId = ref<number>();
    // 修改
    const edit = (id: number) => {
      // 显示修改
      editing.value = true;
      // 记录id
      currentEditId.value = id;
      // 找到对应留言 (这里要加非空断言，因为find返回的值有可能是undefined)
      editvalue.value = list.value.find((val) => val.id == id)!.content;
    };
    // 确认修改
    const sureEdit = () => {
      // 修改内容
      list.value[
        list.value.findIndex((val) => val.id == currentEditId.value)
      ].content = editvalue.value;
      // 返回状态
      editing.value = false;
    };

    // 清屏
    const clear = () => {
      list.value = [];
    };

    // 搜索关键字
    const searchKey = ref("");

    // 筛选出留言列表
    const filterList = computed(() => {
      return list.value.filter(
        (val) =>
          val.content.includes(searchKey.value) ||
          val.nickname.includes(searchKey.value)
      );
    });

    return {
      list,
      editing,
      inputValueName,
      inputValueContent,
      add,
      del,
      edit,
      editvalue,
      currentEditId,
      sureEdit,
      clear,
      searchKey,
      filterList,
      getTime,
    };
  },
});
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");
</style>