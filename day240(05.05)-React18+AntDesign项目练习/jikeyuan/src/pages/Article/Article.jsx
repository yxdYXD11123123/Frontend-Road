import React, { memo, useState } from "react";
import { Card, Form, Radio, Button, DatePicker } from "antd";
import JikeBreadcurmb from "@/components/JikeBreadcrumb/JikeBreadcurmb";
import ArticleList from "./ArticleList";
import ChannelSelector from "@/components/ChannelSelector/ChannelSelector";
const { RangePicker } = DatePicker;

function Article() {
  const breadcrumbItems = [
    {
      path: "",
      breadcrumbName: "首页",
    },
    {
      path: "article",
      breadcrumbName: "内容管理",
    },
  ];

  const formItemLayout = {
    labelAlign: "left",
  };

  const [screens, setScreens] = useState({});

  // 筛选
  const onScreen = (values) => {
    console.log(values);
    const begin_pubdate = values.date
      ? values.date[0].format("YYYY-MM-DD HH:mm:ss")
      : "";
    const end_pubdate = values.date
      ? values.date[1].format("YYYY-MM-DD HH:mm:ss")
      : "";
    // 更新筛选条件
    setScreens({ ...values, begin_pubdate, end_pubdate });
  };

  return (
    <>
      <Card title={<JikeBreadcurmb items={breadcrumbItems} />}>
        {/* 筛选表单 start */}
        <Form
          name="screen-form"
          {...formItemLayout}
          onFinish={onScreen}
          initialValues={{
            status: "",
          }}
        >
          {/* 状态 */}
          <Form.Item name="status" label="状态">
            <Radio.Group>
              <Radio value="">全部</Radio>
              <Radio value="0">草稿</Radio>
              <Radio value="1">待审核</Radio>
              <Radio value="2">审核通过</Radio>
              <Radio value="3">审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          {/* 频道 */}
          <Form.Item
            name="channel_id"
            wrapperCol={{ flex: "264px" }}
            label="频道"
          >
            <ChannelSelector></ChannelSelector>
          </Form.Item>

          {/* 日期 */}
          <Form.Item name="date" label="日期">
            <RangePicker />
          </Form.Item>

          {/* 筛选 */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
        {/* 筛选表单 end */}
      </Card>
      <ArticleList screens={screens}></ArticleList>
    </>
  );
}

export default memo(Article);
