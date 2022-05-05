import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Button, Space, Modal, message } from "antd";
import { delArticleApi, getArticlesApi } from "@/api";
import styles from "./ArticleList.module.less";
import PropTypes from "prop-types";
import DefaultCoverImg from "@/assets/default_cover.png";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

function ArticleList(props) {
  // 文章列表
  const { articles, getArticles, articlesCount, setCurPage, setCurSize } =
    useArticles(props.screens);

  const navigator = useNavigate();

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: CoverImg,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: StatusTag,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "actions",
      render: (article) => {
        return Actions(article, getArticles, navigator);
      },
    },
  ];

  // 分页器配置
  const paginationOptions = {
    total: articlesCount,
    onChange: (page, pageSize) => {
      setCurSize(pageSize);
      setCurPage(page);
    },
  };

  return (
    <Card
      title={`根据筛选条件共查询到 ${articlesCount} 条结果`}
      bordered={true}
      className={styles["articles"]}
    >
      <Table
        columns={columns}
        rowKey="id"
        dataSource={articles}
        pagination={paginationOptions}
      />
    </Card>
  );
}

function StatusTag(status) {
  switch (status) {
    case 0:
      return <Tag>草稿</Tag>;
    case 1:
      return <Tag color={"gold"}>待审核</Tag>;
    case 2:
      return <Tag color={"green"}>审核通过</Tag>;
    case 3:
      return <Tag color={"red"}>审核失败</Tag>;
    default:
      break;
  }
}

// 封面图片
function CoverImg(cover) {
  switch (cover.type) {
    case (1, 3):
      return (
        <img src={cover.images[0]} alt="" className={styles["article-img"]} />
      );
    default:
      return (
        <img src={DefaultCoverImg} alt="" className={styles["article-img"]} />
      );
  }
}

// 操作区
function Actions(article, refreshList, navigator) {
  // 编辑文章
  const editArticle = () => {
    navigator("/publish/" + article.id);
  };
  // 删除文章
  const deleteArticle = () => {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "此操作将永久删除该文章，是否继续？",
      okText: "确定",
      okType: "primary",
      cancelText: "取消",
      onOk: async () => {
        // 删除文章
        const res = await delArticleApi(article.id);
        if (res.message === "OK") {
          // 刷新列表
          refreshList();
          // 已删除
          message.success("文章已删除");
        }
      },
    });
  };

  return (
    <Space>
      <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        onClick={editArticle}
      />
      <Button
        type="danger"
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={deleteArticle}
      />
    </Space>
  );
}

function useArticles(screens) {
  // 文章列表
  const [articles, setArticles] = useState([]);

  // 文章总数
  const [articlesCount, setArticlesCount] = useState(0);

  // 文章当前页
  const [curPage, setCurPage] = useState(1);

  // 文章当前每页数
  const [curSize, setCurSize] = useState(10);

  // 获取文章
  const getArticles = async (screens, page, size) => {
    const res = await getArticlesApi({ ...screens, page, per_page: size });
    const { total_count, results } = res.data;
    setArticlesCount(total_count);
    setArticles(results);
  };

  useEffect(() => {
    getArticles(screens, curPage, curSize);
  }, [screens, curPage, curSize]);

  return {
    articles,
    articlesCount,
    getArticles: () => {
      getArticles(screens, curPage, curSize);
    },
    setCurPage,
    setCurSize,
  };
}

ArticleList.propTypes = {
  screens: PropTypes.object,
};

export default ArticleList;
