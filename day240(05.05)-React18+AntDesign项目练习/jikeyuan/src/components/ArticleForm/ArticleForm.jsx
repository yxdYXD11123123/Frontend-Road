import React from "react";
import { Form, Input, Button, Space, message } from "antd";
import ChannelSelector from "@/components/ChannelSelector/ChannelSelector";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JikeCoverUploader from "@/components/JikeCoverUploader/JikeCoverUploader";
import { publishArticleApi } from "@/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ArticleForm(props) {
  console.log("ArticleForm");
  // 获取表单实例
  const [form] = Form.useForm();

  // 路由导航
  const navigator = useNavigate();

  // 表单值改变时
  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues);
  };

  // 发表文章
  const publish = async (isDraft) => {
    const values = form.getFieldsValue();

    // 校验封面图片类型和数量
    if (values.cover.type !== values.cover.imgaes.length) {
      return message.error("封面类型与所选图片不一致");
    }

    // 文章数据
    const params = {
      ...values,
    };
    const res = await publishArticleApi(isDraft, params);
    // 发布成功跳转文章列表页
    if (res.message === "OK") {
      message.success("发表成功");
      navigator("/article");
    }
  };

  // 发布文章
  const onPublish = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      if (error) return message.error("请完成表单项");
    }
    // 发表文章
    publish(false);
  };

  // 存为草稿
  const keepAsDraft = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      if (error) return message.error("请完成表单项");
    }
    // 发表文章
    publish(true);
  };

  // 表单初始值
  const initialValues = props.article || {
    cover: {
      type: 0,
      images: [],
    },
    content: "",
    title: "",
    channel_id: null,
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form
      name="screen-form"
      form={form}
      {...formItemLayout}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      scrollToFirstError={true}
    >
      {/* 标题 */}
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input placeholder="请输入文章标题" />
      </Form.Item>

      {/* 频道 */}
      <Form.Item name="channel_id" label="频道" rules={[{ required: true }]}>
        <ChannelSelector></ChannelSelector>
      </Form.Item>

      {/* 封面 */}
      <Form.Item name={"cover"} label="封面">
        <JikeCoverUploader />
      </Form.Item>

      {/* 内容 */}
      <Form.Item
        name="content"
        label="内容"
        rules={[{ required: true, message: "请输入内容" }]}
      >
        <ReactQuill
          placeholder="请输入文章内容"
          style={{ height: "300px", paddingBottom: "40px" }}
        />
      </Form.Item>

      <Form.Item label colon={false}>
        <Space>
          <Button type="primary" onClick={onPublish}>
            发布文章
          </Button>

          <Button onClick={keepAsDraft}>存入草稿</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

ArticleForm.propTypes = {
  article: PropTypes.object,
};

export default ArticleForm;
