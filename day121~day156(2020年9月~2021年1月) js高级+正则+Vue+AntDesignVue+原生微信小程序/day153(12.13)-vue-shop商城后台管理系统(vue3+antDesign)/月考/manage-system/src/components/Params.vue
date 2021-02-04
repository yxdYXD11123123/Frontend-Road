<template>
  <a-layout>
    <!-- 面包屑导航 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>商品管理</a-breadcrumb-item>
      <a-breadcrumb-item>参数列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-card>
      <!-- 主体 start -->
      <a-row>
        <a-col>
          选择分类：
          <a-cascader
            v-model:value="checkedCateIds"
            :options="categories"
            :field-names="{ label: 'cat_name', value: 'cat_id' }"
            placeholder="请选择"
            @change="changeCategory"
          />
        </a-col>
      </a-row>
      <!-- tab切换 start -->
      <a-tabs v-model:activeKey="activeKey" @change="changeCategory">
        <a-tab-pane key="many" tab="动态参数">
          <!-- 添加按钮 -->
          <a-button
            type="primary"
            :disabled="checkedCateIds.length !== 3"
            @click="showAddAttr"
            >添加按钮</a-button
          >
          <!-- 列表 -->
          <a-table
            :columns="attrColumns"
            :data-source="manyData"
            bordered
            row-key="attr_id"
          >
            <!-- 序号 -->
            <template #index="{ index }">
              {{ index + 1 }}
            </template>
            <!-- 操作 start -->
            <template #operation="{ record }">
              <!-- 编辑按钮 -->
              <a-button type="primary"><EditOutlined /></a-button>
              <!-- 删除按钮 -->
              <a-popconfirm
                title="确定删除这个参数吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmDelAttr(record.attr_id)"
              >
                <a-button type="danger" style="margin: 0 10px"
                  ><DeleteOutlined
                /></a-button>
              </a-popconfirm>
            </template>
            <!-- 操作 end -->
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="only" tab="静态参数">
          <!-- 添加按钮 -->
          <a-button
            type="primary"
            :disabled="checkedCateIds.length !== 3"
            @click="showAddAttr"
            >添加按钮</a-button
          >
          <a-table
            :columns="attrColumns"
            :data-source="onlyData"
            bordered
            row-key="attr_id"
          >
            <!-- 序号 -->
            <template #index="{ index }">
              {{ index + 1 }}
            </template>
            <!-- 操作 start -->
            <template #operation="{ record }">
              <!-- 编辑按钮 -->
              <a-button type="primary"><EditOutlined /></a-button>
              <!-- 删除按钮 -->
              <a-popconfirm
                title="确定删除这个参数吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmDelAttr(record.attr_id)"
              >
                <a-button type="danger" style="margin: 0 10px"
                  ><DeleteOutlined
                /></a-button>
              </a-popconfirm>
            </template>
            <!-- 操作 end -->
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <!-- tab切换 end -->
      <!-- 添加参数模态框 start -->
      <a-modal
        v-model:visible="addAttrVisible"
        centered
        :title="`添加${activeKey == 'many' ? '动态' : '静态'}参数`"
        ok-text="确认"
        cancel-text="取消"
        @ok="confirmAddAttr"
      >
        <a-form
          :model="addAttr.model"
          :rules="addAttr.rules"
          ref="addAttrRef"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 16 }"
        >
          <a-form-item
            :label="`${activeKey == 'many' ? '动态' : '静态'}参数`"
            name="attr_name"
          >
            <a-input v-model:value="addAttr.model.attr_name" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加参数模态框 end -->
      <!-- 主体 end -->
    </a-card>
  </a-layout>
</template>

<script>
// 引入图标
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
// 引入请求方法
import { httpGet, httpPost, httpDelete } from "@/utils/http";
// 引入接口
import { categories, attributes } from "@/api";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      // 选中的分类
      checkedCateIds: [],
      // 所有分类
      categories: [],
      // 动态/静态
      activeKey: "many",
      // 参数列配置
      attrColumns: [
        {
          slots: { customRender: "index" },
        },
        {
          title: "参数名称",
          dataIndex: "attr_name",
        },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      // 动态参数列表
      manyData: [],
      // 静态参数列表
      onlyData: [],
      // 添加参数模态框
      addAttrVisible: false,
      // 添加参数表单
      addAttr: {
        model: {
          attr_name: "",
        },
        rules: {
          attr_name: [
            {
              required: true,
              message: "参数名必须填写",
              trigger: "blur",
              whitespace: true,
            },
          ],
        },
      },
    };
  },
  created() {
    // 获取所有分类
    this.getCategories();
  },
  methods: {
    // 获取所有分类
    getCategories() {
      // 发起请求获取
      httpGet(categories.GetCategories)
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this.categories = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 切换分类
    changeCategory() {
      if (this.cate_id == null) {
        return;
      }
      // 发起请求获取参数
      // 发起请求获取
      httpGet(attributes.GetAttributes + `/${this.cate_id}/attributes`, {
        sel: this.activeKey,
      })
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this[this.activeKey + "Data"] = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示添加参数模态框
    showAddAttr() {
      this.addAttrVisible = true;
    },
    // 确定添加参数
    confirmAddAttr() {
      // 先校验
      this.$refs.addAttrRef
        .validate()
        .then(() => {
          // 发送请求添加参数
          httpPost(
            attributes.AddAttributes + "/" + this.cate_id + "/attributes",
            {
              attr_name: this.addAttr.model.attr_name,
              attr_sel: this.activeKey,
            }
          )
            .then((res) => {
              let { meta } = res;
              if (meta.status == 201) {
                message.success("参数添加成功");
                // 刷新页面
                this.changeCategory();
                // 关闭模态框
                this.addAttrVisible = false;
                // 重置表单
                this.$refs.addAttrRef.resetFields();
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
    // 确定删除参数
    confirmDelAttr(id) {
      httpDelete(attributes.DelAttributes + `/${this.cate_id}/attributes/${id}`)
        .then((res) => {
          if (res.meta.status == 200) {
            message.success("参数删除成功");
            // 刷新
            this.changeCategory();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    // 选中的三级id
    cate_id() {
      if (this.checkedCateIds.length == 3) {
        return this.checkedCateIds[2];
      }
      return null;
    },
  },
  components: {
    EditOutlined,
    DeleteOutlined,
  },
};
</script>

<style></style>
