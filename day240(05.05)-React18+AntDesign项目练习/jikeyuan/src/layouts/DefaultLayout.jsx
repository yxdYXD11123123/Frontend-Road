import { Layout, Menu } from "antd";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import LayoutHeader from "@/components/Header/Header";
import useAuth from "@/hooks/useAuth";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { memo, useLayoutEffect, useState } from "react";

const { Sider, Content } = Layout;

function DefaultLayout() {
  // 鉴权
  let auth = useAuth();
  // 获取当前location信息
  let location = useLocation();
  // 导航
  const navigator = useNavigate();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("数据概览", "/", <PieChartOutlined />),
    getItem("内容管理", "/article", <DesktopOutlined />),
    getItem("发布文章", "/publish", <ContainerOutlined />),
  ];

  // 选择时，导航到页面
  const onSelect = (e) => {
    navigator(e.key);
  };

  // 选中的菜单项
  const [selectedKeys, setSelectedKeys] = useState(["/"]);

  // 路由切换时，自动更新选中的菜单项
  useLayoutEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  if (!auth.token) {
    // 如果没有token代表未鉴权
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Layout>
      <LayoutHeader></LayoutHeader>
      <Layout>
        <Sider>
          <Menu
            selectedKeys={selectedKeys}
            mode="inline"
            theme="dark"
            items={items}
            onSelect={onSelect}
          />
        </Sider>
        <Content style={{ padding: "20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default memo(DefaultLayout);
