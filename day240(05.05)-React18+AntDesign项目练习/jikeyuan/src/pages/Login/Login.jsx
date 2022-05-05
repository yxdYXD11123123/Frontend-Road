import React from "react";
import styles from "./Login.module.less";
import { Form, Input, Checkbox, Button, message } from "antd";
import Logo from "@/assets/logo.png";
import { login } from "@/api";

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login: authLogin } = useAuth();
  const navigator = useNavigate();

  // 完成校验
  const onFinish = async (values) => {
    const { mobile, code } = values;
    // 发起请求
    const res = await login({ mobile, code });
    if (res.message === "OK") {
      authLogin(res.data);
      message.success("登录成功");
      navigator("/");
    }
  };

  return (
    <div className={styles["login"]}>
      <Form
        className={styles["login-form"]}
        name="basic"
        wrapperCol={{ span: 22, offset: 1 }}
        initialValues={{
          remember: true,
          mobile: "13911111111",
          code: "246810",
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <img src={Logo} alt="" className={styles["logo"]} />
        {/* 手机号 */}
        <Form.Item
          name="mobile"
          rules={[{ required: true, message: "手机号为必填项" }]}
        >
          <Input size="large" placeholder="请输入手机号" />
        </Form.Item>
        {/* 验证码 */}
        <Form.Item
          name="code"
          rules={[{ required: true, message: "验证码为必填项" }]}
        >
          <Input size="large" placeholder="请输入验证码" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block size="large" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
