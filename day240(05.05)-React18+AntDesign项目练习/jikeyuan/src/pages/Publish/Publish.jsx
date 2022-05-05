import React from "react";
import { Card } from "antd";
import JikeBreadcurmb from "@/components/JikeBreadcrumb/JikeBreadcurmb";
import ArticleForm from "@/components/ArticleForm/ArticleForm";

// 发表文章
function Publish() {
  // 面包屑导航
  const breadcrumbItems = [
    {
      path: "",
      breadcrumbName: "首页",
    },
    {
      path: "publish",
      breadcrumbName: "发布文章",
    },
  ];

  return (
    <Card title={<JikeBreadcurmb items={breadcrumbItems} />}>
      <ArticleForm></ArticleForm>
    </Card>
  );
}

export default Publish;
