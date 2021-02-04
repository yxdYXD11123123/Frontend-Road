<template>
  <a-layout>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-card>
      <!-- 主体 start -->
      <!--  @search="onSearch" -->
      <a-row>
        <!-- 搜索用户 start -->
        <a-input-search
          v-model:value="searchKey"
          placeholder="请输入搜索内容"
          size="large"
          style="width: 500px; margin-bottom: 20px; margin-right: 20px"
          @search="getUserList"
        />
        <!-- 搜索用户 end -->

        <!-- 添加用户 -->
        <a-button type="primary" size="large" @click="showAddUser"
          >添加用户</a-button
        >
      </a-row>
      <!-- 用户列表 start -->
      <a-table
        :columns="usersColumns"
        :data-source="usersData"
        row-key="id"
        :pagination="false"
      >
        <!-- 序号 -->
        <template #index="{ index }">
          {{ pageSize * (pageNum - 1) + index + 1 }}
        </template>
        <!-- 状态 -->
        <template #mg_state="{ text }">
          <a-switch :checked="text" />
        </template>
        <!-- 操作 start -->
        <template #operation="{ record }">
          {{ record }}
          <!-- 编辑按钮 -->
          <a-button type="primary" @click="showEditUser(record.id)"
            ><EditOutlined
          /></a-button>
          <!-- 删除按钮 -->
          <a-popconfirm
            title="确定删除这个用户吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirmDelUser(record.id)"
          >
            <a-button type="danger" style="margin: 0 10px"
              ><DeleteOutlined
            /></a-button>
          </a-popconfirm>

          <!-- 设置按钮 -->
          <a-button><SettingOutlined /></a-button>
        </template>
        <!-- 操作 end -->
      </a-table>
      <!-- 用户列表 end -->
      <!-- 分页器 start -->
      <a-pagination
        :total="total"
        show-size-changer
        show-quick-jumper
        @change="changePageNum"
        @showSizeChange="changePageSize"
        style="margin-top: 20px"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
      <!-- 分页器 end -->
      <!-- 添加用户模态框 start -->
      <a-modal
        v-model:visible="addUserVisible"
        centered
        title="添加用户"
        ok-text="确认"
        cancel-text="取消"
        @ok="confirmAddUser"
      >
        <!-- 添加用户表单 start -->
        <a-form
          :model="addUser.model"
          :rules="addUser.rules"
          ref="addUserRef"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 16 }"
        >
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="addUser.model.username" />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input v-model:value="addUser.model.password" />
          </a-form-item>
          <a-form-item label="邮箱" name="email" required>
            <a-input v-model:value="addUser.model.email" />
          </a-form-item>
          <a-form-item label="手机" name="mobile" required>
            <a-input v-model:value="addUser.model.mobile" />
          </a-form-item>
        </a-form>
        <!-- 添加用户表单 end -->
      </a-modal>
      <!-- 添加用户模态框 end -->

      <!-- 编辑用户模态框 start -->
      <a-modal
        v-model:visible="editUserVisible"
        centered
        title="编辑用户"
        ok-text="确认"
        cancel-text="取消"
        @ok="confirmEditUser"
      >
        <!-- 编辑用户表单 start -->
        <a-form
          :model="editUser.model"
          :rules="editUser.rules"
          ref="editUserRef"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 16 }"
        >
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="editUser.model.username" disabled />
          </a-form-item>
          <a-form-item label="邮箱" name="email" required>
            <a-input v-model:value="editUser.model.email" />
          </a-form-item>
          <a-form-item label="手机" name="mobile" required>
            <a-input v-model:value="editUser.model.mobile" />
          </a-form-item>
        </a-form>
        <!-- 编辑用户表单 end -->
      </a-modal>
      <!-- 编辑用户模态框 end -->
      <!-- 主体 end -->
    </a-card>
  </a-layout>
</template>
<script>
// 引入接口
import { users } from "@/api";
// 引入请求方法
import { httpGet, httpPost, httpPut, httpDelete } from "@/utils/http";

// 引入图标
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
// 引入提示
import { message } from "ant-design-vue";

export default {
  data() {
    // 自定义校验规则
    // 校验邮箱
    let validateEmail = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入邮箱");
      }
      if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value)) {
        return Promise.reject("邮箱格式不正确");
      }
      return Promise.resolve();
    };
    // 校验手机号
    let validateMobile = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入手机号");
      }
      if (
        !/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(value)
      ) {
        return Promise.reject("手机号格式不正确");
      }
      return Promise.resolve();
    };

    // 返回
    return {
      // 搜索关键字
      searchKey: "",
      // 用户列表的列配置
      usersColumns: [
        {
          slots: { customRender: "index" },
        },
        {
          title: "姓名",
          dataIndex: "username",
        },
        {
          title: "邮箱",
          dataIndex: "email",
        },
        {
          title: "电话",
          dataIndex: "mobile",
        },
        {
          title: "角色",
          dataIndex: "role_name",
        },
        {
          title: "状态",
          dataIndex: "mg_state",
          slots: { customRender: "mg_state" },
        },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      // 总页数
      total: 1,
      // 当前页码
      pageNum: 1,
      // 当前每页多少条
      pageSize: 10,
      // 用户列表的数据
      usersData: [],
      // 添加用户模态框
      addUserVisible: false,
      // 添加用户表单
      addUser: {
        // 数据
        model: {
          username: "",
          password: "",
          email: "",
          mobile: "",
        },
        // 校验规则
        rules: {
          username: [
            {
              required: true,
              message: "用户名必须填写",
              trigger: "blur",
              whitespace: true,
            },
          ],
          password: [
            {
              required: true,
              message: "密码必须填写",
              trigger: "blur",
              whitespace: true,
            },
          ],
          email: [{ validator: validateEmail, trigger: "blur" }],
          mobile: [{ validator: validateMobile, trigger: "blur" }],
        },
      },
      // 编辑用户模态框
      editUserVisible: false,
      // 编辑用户表单
      editUser: {
        // 数据
        model: {
          username: "",
          email: "",
          mobile: "",
          id: "",
        },
        // 校验规则
        rules: {
          username: [
            {
              required: true,
              message: "用户名必须填写",
              trigger: "blur",
              whitespace: true,
            },
          ],
          email: [{ validator: validateEmail, trigger: "blur" }],
          mobile: [{ validator: validateMobile, trigger: "blur" }],
        },
      },
    };
  },
  created() {
    // 获取用户列表
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      // 发起请求
      httpGet(users.GetUsers, {
        pagenum: this.pageNum,
        pagesize: this.pageSize,
        query: this.searchKey,
      })
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this.usersData = data.users;
            this.total = data.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转页码
    changePageNum(page, pageSize) {
      this.pageNum = page;
      this.pageSize = pageSize;
      // 重新获取数据
      this.getUserList();
    },
    // 切换每页条数
    changePageSize(current, size) {
      this.pageNum = current;
      this.pageSize = size;
      // 重新获取数据
      this.getUserList();
    },
    // 显示添加用户模态框
    showAddUser() {
      this.addUserVisible = true;
    },
    // 确定添加用户
    confirmAddUser() {
      // 先校验
      this.$refs.addUserRef
        .validate()
        .then(() => {
          // 发起添加用户请求
          httpPost(users.AddUser, this.addUser.model)
            .then((res) => {
              let { meta } = res;
              if (meta.status == 201) {
                // 提示用户
                message.success("用户添加成功");
                // 关闭模态框
                this.addUserVisible = false;
                // 刷新数据
                this.getUserList();
                // 重置表单
                this.$refs.addUserRef.resetFields();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示编辑用户模态框
    showEditUser(id) {
      // 发起查询用户请求
      httpGet(users.GetUser + "/" + id)
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this.editUser.model.username = data.username;
            this.editUser.model.mobile = data.mobile;
            this.editUser.model.email = data.email;
            // 记录id
            this.editUser.model.id = data.id;
            // 显示模态框
            this.editUserVisible = true;
          } else {
            message.error(meta.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 确定编辑用户
    confirmEditUser() {
      // 先校验
      this.$refs.editUserRef
        .validate()
        .then(() => {
          // 发起编辑用户请求
          httpPut(users.EditUser + "/" + this.editUser.model.id, {
            email: this.editUser.model.email,
            mobile: this.editUser.model.mobile,
          })
            .then((res) => {
              let { meta } = res;
              if (meta.status == 200) {
                // 提示用户
                message.success("用户更新成功");
                // 刷新页面
                this.getUserList();
                // 关闭模态框
                this.editUserVisible = false;
                // 重置表单
                this.$refs.editUserRef.resetFields();
              } else {
                message.error(meta.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 确定删除用户
    confirmDelUser(id) {
      // 发起删除用户请求
      httpDelete(users.DelUser + "/" + id)
        .then((res) => {
          if (res.meta.status == 200) {
            message.success("删除用户成功");
            // 刷新页面
            this.getUserList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
  },
};
</script>

<style></style>

