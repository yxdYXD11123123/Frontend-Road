## Formik

Formik 是一个小型库，可帮助您处理3个最烦人的部分：

* 获取表单状态中的值和表单状态中的值
* 验证和错误消息
* 处理表格提交

### 使用

```jsx
/**
 * 登录页面
 * 
 * Login
 */

import React from "react";
import { useHistory } from "react-router";
// 导入样式
import styles from "./Login.module.scss";
// 引入组件
import { NavBar, Icon, WingBlank, WhiteSpace, InputItem, Toast } from 'antd-mobile'
// 引入校验表单插件
import { useFormik } from "formik";
// 导入请求接口
import { login } from "@/api"

function Login() {
  // 路由控制
  const history = useHistory();

  // 返回上一页
  const navBack = () => {
    history.goBack();
  }

  // 登录表单
  const formik = useFormik({
    // 初始值
    initialValues: { username: '', password: '' },
    // 校验函数（返回报错信息）
    validate: values => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      return errors;
    },
    // 提交表单
    onSubmit: (values) => {
      // 发起登录请求
      login(values).then(res => {
        localStorage.setItem('hkzf_token', res.token);
        Toast.success("登录成功", 1)
      }).catch(res => {
        // 显示登录失败原因
        Toast.fail(res.err.description, 1);
      })
    }
  });
  // 获取formik提供的props
  const { values, errors, setValues, touched, handleBlur, handleChange } = formik;

  return (
    <div>
      <NavBar mode="light" onLeftClick={navBack} icon={<Icon type="left" color={'grey'} />}>账号登录</NavBar>
      {/* 登录表单 start */}
      <WingBlank>
        {/* 给form表单绑定formik提供的handleSubmit */}
        <form className={styles['login-form']} onSubmit={formik.handleSubmit}>
          <WhiteSpace />
          {/* 账号 */}
          {/* 使用values绑定表单值 */}
          <input type="text" name="username" placeholder="请输入账号" value={values.username} onChange={handleChange} onBlur={handleBlur} />
          {/* 如果使用InputItem 因为 InputItem 提供的 onChange事件，默认参数直接是value，而Formik提供的 handleChange 使用的是 通过事件对象拿到的value，所以我们改用setValues完成受控 */}
          {/* <InputItem name="username" placeholder="请输入账号" value={values.username} onChange={value => { setValues({ username: value, password: values.password }) }} onBlur={handleBlur}  ></InputItem> */}

          {/* 想要使用touched(判断表单元素是否触发过)， 必须给表单元素绑定 handleBlur */}
          {/* 使用errors获取报错信息 */}
          {/* 如果用户访问过的 且 校验有问题的 字符段，显示错误信息 */}
          {errors.username && touched.username && <div className={styles['error-msg']}> {errors.username}</div>}
          <WhiteSpace />
          {/* 密码 */}
          <InputItem type="password" name="password" placeholder="请输入密码" value={values.password} onChange={value => { setValues({ password: value, username: values.username }) }} ></InputItem>
          {errors.password && <div className={styles['error-msg']}> {errors.password}</div>}
          <WhiteSpace />
          {/* 登录按钮 start */}
          <button type="submit" className={styles['login-btn']} >登录</button>
          {/* 登录按钮 end */}
        </form>
      </WingBlank>
      {/* 登录表单 end */}
    </div>
  )
}

export default Login;
```

