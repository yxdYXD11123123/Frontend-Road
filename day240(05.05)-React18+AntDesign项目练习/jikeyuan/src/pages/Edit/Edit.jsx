import React, { useEffect, useState } from "react";
import { Card } from "antd";
import JikeBreadcurmb from "@/components/JikeBreadcrumb/JikeBreadcurmb";
import ArticleForm from "@/components/ArticleForm/ArticleForm";
import { useParams } from "react-router-dom";
import { getArticleDetailsApi } from "@/api";

// 编辑文章
function Edit() {
  // 面包屑导航
  const breadcrumbItems = [
    {
      path: "",
      breadcrumbName: "首页",
    },
    {
      path: "publish",
      breadcrumbName: "编辑文章",
    },
  ];
  // 获取路由参数
  const params = useParams();

  // 文章信息
  const [article, setArticle] = useState(null);

  // 获取文章详情
  const getArticleDetails = async (id) => {
    // 发起请求
    const res = await getArticleDetailsApi(id);
    if (res.message === "OK") {
      res.data.cover_type = res.data.cover.type;
      setArticle(res.data);
    }
  };

  // 获取数据
  useEffect(() => {
    getArticleDetails(params.id);
  }, [params]);

  return (
    <Card title={<JikeBreadcurmb items={breadcrumbItems} />}>
      {article && <ArticleForm article={article}></ArticleForm>}
    </Card>
  );
}

export default Edit;
