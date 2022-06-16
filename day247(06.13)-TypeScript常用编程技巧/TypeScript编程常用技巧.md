### `Partial<T>`

作用：让指定泛型中<font color='#EA7500'>所有属性</font>变为<font color='#EA0000'>**可选**</font>

使用场景：

* 更新某类型的部分信息时，可以使用该方法要求类型

  ```ts
  // 更新个人信息
  export const updateUserProfileAPI = (userProfile: Partial<UserProfile>) => {
    return request.patch("/user/profile", userProfile);
  };
  
  ```

### `ReturnType<T>`

作用：获取某<font color='#EA7500'>方法类型</font>的**<font color='#EA0000'>返回值类型</font>**

使用场景：

* 在`Redux`中，通过 `getState()` 获取 state 中存储状态的类型

  ```typescript
  // 获取 state 中存储的状态的类型
  export type AppState = ReturnType<typeof store.getState>;
  ```



### React中需使用的知识

React修改事件类型：**`e: React.ChangeEvent<绑定元素类型>`**

例如：`e: React.ChangeEvent<HTMLInputElement>`