<template>
  <!-- 聊天室 start -->
  <div class="room">
    <!-- 侧边栏 start -->
    <div class="aside">
      <!-- 个人头像和昵称 -->
      <div class="aside-myself">
        <img
          :src="`${baseUrl}/images/avatar_0${userInfo.avatarId}.png`"
          alt=""
        />
        <span>{{ userInfo.nickName }}</span>
        <!-- 发起聊天的下拉菜单 start -->
        <Dropdown :trigger="['click']">
          <Button :size="'small'" @click.prevent>
            发起聊天
            <DownOutlined />
          </Button>
          <template #overlay>
            <div>
              <Menu @click="openChat">
                <!-- 可发起对话的用户 start -->
                <MenuItem v-for="item in toChatList" :key="item.sid">
                  <img
                    class="aside-tochat-avatars"
                    :src="`${baseUrl}/images/avatar_0${item.avatarId}.png`"
                    alt=""
                  />
                  <span>{{ item.nickName }}</span>
                </MenuItem>

                <!-- 可发起对话的用户 end -->
              </Menu>

              <!-- 加入房间 start -->
              <Menu @click="joinRoom">
                <MenuItem v-for="item in toChatRoomList" :key="item.roomName">
                  <span>房间--{{ item.roomName }}</span>
                </MenuItem>
              </Menu>
              <!-- 加入房间 end -->
            </div>
          </template>
        </Dropdown>
        <!-- 发起聊天的下拉菜单 end -->
      </div>
      <!-- 已开启的单聊 start -->
      <div class="aside-single-room">
        <h3>单聊列表</h3>
        <div
          v-for="item in singleChatters"
          :key="item.sid"
          :class="{ active: curRoom === item.sid }"
          @click="curRoom = item.sid"
        >
          <img :src="`${baseUrl}/images/avatar_0${item.avatarId}.png`" alt="" />
          {{ item.nickName }}
        </div>
      </div>
      <!-- 已开启的单聊 end -->

      <!-- 已进入的(群聊)房间 start -->
      <div class="aside-group-room">
        <h3>房间列表</h3>
        <!-- 创建房间 start -->
        <InputSearch
          class="aside-create-room"
          v-model:value="newRoomName"
          placeholder="房间名"
          @search="createNewRoom"
        >
          <template #enterButton>
            <Button>创建新房间</Button>
          </template>
        </InputSearch>
        <!-- 创建房间 end -->

        <!-- 房间列表 start -->
        <div
          v-for="item in roomsChatters"
          :key="item.roomId"
          :class="{ active: curRoom === item.roomId }"
          @click="curRoom = item.roomId"
        >
          房间：{{ item.roomId }}
        </div>
        <!-- 房间列表 end -->
      </div>
      <!-- 已进入的(群聊)房间 end -->
    </div>
    <!-- 侧边栏 end -->

    <!-- 聊天框 start -->
    <div class="chat">
      <div class="chat-title">{{ curRoom || "聊天室" }}</div>
      <!-- 聊天内容 -->
      <div class="chat-content">
        <!-- curRoomContent: [ {nickName,avatarId,online,sid,msg,time}, {msg,time}, {isSystemMsg, msg}] -->
        <div
          v-for="(item, index) in curRoomContent"
          :key="index"
          :class="[
            item.sid ? '' : 'self-right',
            item.isSystemMsg ? 'system-msg' : '',
          ]"
        >
          <!-- 系统消息 -->
          <span v-if="item.isSystemMsg">{{ item.msg }}</span>
          <template v-else>
            <img
              :src="`${baseUrl}/images/avatar_0${
                item.avatarId || userInfo.avatarId
              }.png`"
              alt=""
            />
            <div class="chat-content-msg">
              <h4 v-if="item.nickName">{{ item.nickName }}</h4>
              <img v-if="item.isImg" :src="item.msg" alt="" />
              <p v-else>{{ item.msg }}</p>
            </div>
          </template>
        </div>
      </div>
      <!-- 聊天工具 -->
      <div class="chat-tools">
        <!-- 选择表情 -->
        <i
          class="iconfont icon-biaoqing-copy"
          @click="
            () => {
              showEmojiPicker = !showEmojiPicker;
            }
          "
        ></i>
        <!-- 选择图片 -->
        <label for="picture">
          <i class="iconfont icon-a-tupian"></i>
        </label>
        <input
          type="file"
          id="picture"
          style="display: none"
          @change="choosePicture"
        />
        <Picker
          class="emoji-picker"
          v-show="showEmojiPicker"
          :data="emojiIndex"
          set="apple"
          @select="showEmoji"
        ></Picker>
      </div>
      <!-- 聊天输入框 -->
      <div class="chat-input">
        <textarea
          ref="chatInput"
          :disabled="!curRoom"
          v-model="inputContent"
          @keyup.enter="send"
        ></textarea>
      </div>
    </div>
    <!-- 聊天框 end -->
  </div>
  <!-- 聊天室 end -->
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue";
// 导入下拉菜单
import { Dropdown, Menu, MenuItem, Button, InputSearch } from "ant-design-vue";
// 下拉图标
import { DownOutlined } from "@ant-design/icons-vue";

// 输入框
const chatInput = ref(null);
// 输入的内容
const inputContent = ref("");

//#region 使用 表情选择器
const showEmojiPicker = ref(false);
// 导入 表情数据
import data from "emoji-mart-vue-fast/data/all.json";
// 导入 表情选择器样式
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src/index.js";
let emojiIndex = new EmojiIndex(data);
function showEmoji(emoji) {
  inputContent.value = inputContent.value + emoji.native;
  showEmojiPicker.value = false;
  chatInput.value.focus();
}
//#endregion

// 基地址
const baseUrl = import.meta.env.VITE_RES_URL;
// 获取socket
const socket = inject("socket");
// 获取可发起·聊天的用户
const toChatList = inject("toChatList");
// 显示个人信息
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// 已开启的单聊 聊友列表
// [{nickName, avatarId, sid, chatContent:[{msg, time}]}]
const singleChatters = ref([]);
// 房间 聊天信息 [{roomId, chatRecord: [{nickName, avatarId, sid, msg, time}, {systemMsg, msg}]}]
const roomsChatters = ref([]);
// 我发送的消息
const myMsg = ref([]);

// 发送消息
const sendMsg = (type, toRoom, msg, isImg) => {
  console.log(type, toRoom, msg, isImg);
  // 本地记录
  const index = myMsg.value.findIndex((val) => val.toRoom === toRoom);
  if (index === -1) {
    myMsg.value.push({ toRoom, content: [{ msg, time: +new Date(), isImg }] });
  } else {
    myMsg.value[index].content.push({ msg, time: +new Date(), isImg });
  }
  console.log(type, toRoom, msg, isImg);
  socket.emit(type, toRoom, msg, isImg);
};

//#region 发送图片
const choosePicture = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (evt) {
    const dataUrl = evt.target.result;
    const rIndex = roomsChatters.value.findIndex(
      (val) => val.roomId === curRoom.value
    );
    rIndex != -1
      ? sendMsg("room message", curRoom.value, dataUrl, true)
      : sendMsg("private message", curRoom.value, dataUrl, true);
  };
  reader.readAsDataURL(file);
};
//#endregion

// 当前所选聊天房间
const curRoom = ref("");

// 当前房间 聊天信息 [{nickName, avatarId, sid, msg, time}]
const curRoomContent = computed(() => {
  const sIndex = singleChatters.value.findIndex(
    (val) => val.sid === curRoom.value
  );
  const rIndex = roomsChatters.value.findIndex(
    (val) => val.roomId === curRoom.value
  );
  if (sIndex === -1 && rIndex === -1) return "";

  // 加入我发的消息（注意这里最好是深拷贝，否则会导致循环多次）
  let content =
    rIndex === -1
      ? [...singleChatters.value[sIndex].chatContent]
      : [...roomsChatters.value[rIndex].chatRecord];
  const mySendContent = myMsg.value.find((val) => val.toRoom === curRoom.value);
  if (mySendContent) {
    content.push(...mySendContent.content);
  }
  // 按照时间排序
  content.sort((a, b) => a.time - b.time);
  return content;
});

// 开启对话
const openChat = ({ key }) => {
  sendMsg("private message", key, "你好呀");
  // 给单聊列表中添加信息
  const userInfo = toChatList.value.find((val) => val.sid === key);
  const index = singleChatters.value.findIndex((val) => val.sid === key);
  if (index === -1) singleChatters.value.push({ ...userInfo, chatContent: [] });
  // 自动切换窗口
  curRoom.value = key;
};

// 发送
const send = () => {
  const rIndex = roomsChatters.value.findIndex(
    (val) => val.roomId === curRoom.value
  );
  rIndex != -1
    ? sendMsg("room message", curRoom.value, inputContent.value)
    : sendMsg("private message", curRoom.value, inputContent.value);
  // 清空
  inputContent.value = "";
};

// 监听 单聊对话
socket.on("private message", (userInfo, msg, time, isImg) => {
  // 寻找是否已经存在此用户
  const index = singleChatters.value.findIndex(
    (val) => val.sid === userInfo.sid
  );
  // 不存在则加入新用户
  if (index === -1) {
    singleChatters.value.push({
      ...userInfo,
      chatContent: [{ ...userInfo, msg, time, isImg }],
    });
  }
  // 存在则添加新消息内容
  else {
    singleChatters.value[index].chatContent.push({
      ...userInfo,
      msg,
      time,
      isImg,
    });
  }
  console.log("收到新消息：", singleChatters.value);
});

// 监听 群聊对话
socket.on("room message", (userInfo, msg, time, isImg, roomId) => {
  console.log(111);
  // 寻找是否已经存在此用房间
  const index = roomsChatters.value.findIndex((val) => val.roomId === roomId);
  roomsChatters.value[index].chatRecord.push({
    ...userInfo,
    msg,
    time,
    isImg,
  });
  console.log("收到新的群消息", roomsChatters.value);
});

//#region 创建新房间 并加入
const newRoomName = ref("");

const createNewRoom = (value) => {
  // 创建房间
  socket.emit("create new room", value);
  // 添加房间信息
  roomsChatters.value.push({ roomId: value, chatRecord: [] });
  console.log(roomsChatters.value);
  // 清空
  newRoomName.value = "";
};
//#endregion

//#region 可进入的新房间
const toChatRoomList = inject("toChatRoomList");

// 加入 房间
const joinRoom = ({ key }) => {
  socket.emit("join room", key);
  roomsChatters.value.push({ roomId: key, chatRecord: [] });
};

// 监听 其它用户加入房间
socket.on("someone join in", (userInfo, roomName) => {
  console.log("someone join in", userInfo);
  // [{roomId, chatRecord: [{nickName, avatarId, sid, msg, time}, {isSystemMsg, msg}]}]
  // 找到对应房间索引
  const index = roomsChatters.value.findIndex((val) => val.roomId === roomName);
  roomsChatters.value[index].chatRecord.push({
    isSystemMsg: true,
    msg: `${userInfo.nickName}加入了房间`,
  });
});
//#endregion
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>