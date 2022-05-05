import React from "react";
import logo from "@/assets/logo.png";
import { Layout, Popconfirm } from "antd";
import styles from "./Header.module.less";
import { LoginOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";

function Header() {
  const { logout } = useAuth();

  return (
    <Layout.Header className={styles["header"]}>
      <img src={logo} alt="" className={styles["logo"]} />
      <div className={styles["header-right"]}>
        <span className={styles["username"]}>用户名</span>
        <Popconfirm
          title="确定退出登录吗？"
          onConfirm={logout}
          okText="确定"
          cancelText="取消"
          placement="bottomRight"
        >
          <span className={styles["logout"]}>
            <LoginOutlined /> 退出
          </span>
        </Popconfirm>
      </div>
    </Layout.Header>
  );
}

export default Header;
