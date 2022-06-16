## 回顾 Redux 传统写法

### 整体流程

* 创建store，添加中间件 `thunk`

  ```js
  import { createStore, applyMiddleware } from "redux";
  import thunk from "redux-thunk";
  import reducer from "./reducer";
  
  const store = createStore(reducer, applyMiddleware(thunk));
  
  export default store;
  ```

* 创建reducer处理中心

  * 匹配 `action` 
  * 拷贝`state` 更新

  ```js
  import { SET_USER_INFO } from "./constants";
  
  // 创建初始化状态
  const initialState = {
    userInfo: null,
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      // 匹配action类型
      case SET_USER_INFO:
        // 总是需要 重新拷贝一份，以此触发更新
        return { ...state, userInfo: action.userInfo };
      default:
        return state;
    }
  }
  ```

* 创建各种 `actions` 以供组件使用

  ```js
  // 这里使用函数式的action
  import { SET_USER_INFO } from "./constants";
  import { getUserInfoById } from "../api/user";
  
  // 一般情况 actions需直接返回 一个对象
  export const setUserInfo = (data) => {
    return { type: SET_USER_INFO, userInfo: data };
  };
  
  /**
   * 更新用户信息
   * @return {(function(*): Promise<void>)|*}
   */
  export const updateUserInfo = () => {
    return async (dispatch) => {
      // 获取个人信息
      const res = await getUserInfoById();
      if (res.code === 200) {
        dispatch(setUserInfo(res.data));
      }
    };
  };
  ```

* 组件中使用 `dispatch` 更新数据，使用 `useSelector` 获取数据



## Redux Toolkit

`Redux Toolkit` 旨在<font style="background-color:#ff0">书写 `Redux` 逻辑 的标准方式</font>。

最初创建，就是为了<font color='#EA0000'>解决 `Redux`的三个问题</font>：

* 配置 `Redux` store 太复杂
* `Redux` 总是需要配置很多包
* `Redux` 需要太多冗余代码

目标：提供一些工具<font style="background-color:#ff0">抽象<font color='#8600FF'>搭建过程</font></font>，引入一些有用的工具 <font color='#EA0000'>简化</font> 开发者的使用体验。并且提供了<font color='#8600FF'> `RTK Query`</font>，可以用来<font color='#8600FF'>代替</font>手写数据获取的代码

#### APIs

`Redux Toolkit` 提供了以下 常用`API`

* `configureStore()`
* `createReducer()`
* `createAction()`
* `createSlice()`
* `createAsyncThunk`
* `createSelector`

### 整体流程

#### 创建 `store`

使用 `configureStore` 创建 store，配置reducer、middleware、enhancers等

##### 注意：

* 创建出来的store，<font style="background-color:#ff0">自带` redux-thunk`</font>，无需额外添加`thunk`中间件

```js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  // 是否开启浏览器的 redux 开发者调试工具
  devTools: process.env.NODE_ENV !== "production",
  // 配置reducer
  reducer: {},
  middleware: ...
})
```

#### 创建 `reducer`

##### 特点一：

内置<font color='#EA0000'> `immer`</font> ，便于 开发者 用 <font color='#8600FF'>可变代码更新方式 </font>做到 <font color='#EA0000'>简单的不可变代码更新 </font>

```js
// 如下方式修改 state，直接可以做到 不可变更新
state.todos[3].completed = true
// 无需 像之前一样：state = {...state, todo: ...}
```

<font style="background-color:#ff0">简化 `state` 的更新过程</font>

##### 特点二：

允许我们写一个 **<font color='#8600FF'>action类型 的 检查表</font>** 去匹配 <font color='#EA0000'>reducer 函数</font>

而不是之前的 `switch...case` 语句

```js
import { setUserInfoAction } from "./../actions/index";
import { createReducer } from "@reduxjs/toolkit";

const initialState = { count: 0 };

// 使用 createReducer 创建reducer
const rootReducer = createReducer(initialState, (builder) => {
  builder
    // 添加 匹配项，传入action 与 更新state的处理函数
    .addCase(setUserInfoAction, (state) => {
      state.count = 33;
    })
    .addDefaultCase((state, action) => {
      console.log("没有匹配到reducers");
    });
});

export default rootReducer;
```

##### 注意：

* 官网有很<font style="background-color:#ff0">多种 `reducer `写法</font>，`build.addCase` 只是其中一种。
* 可以将 `reducer `写在<font color='#8600FF'> `slice` 切片</font>中，跟随<font color='#EA7500'>组件文件夹</font>放置。

#### 创建 `action`

使用 `createAction`

```typescript
import { createAction } from "@reduxjs/toolkit";

export const setUserInfoAction = createAction<Object>("userInfo/set");
// 返回值：以前传统写法认识的 action对象 {type:"userInfo/set", payload:{}}
// ts下，注意要传 payload 类型，如上为Object
```

#### 创建  `AsyncThunk`

使用 `createAsyncThunk`，用于<font color='#EA0000'>异步获取数据进行更新</font>

`fetchUserById.fulfilled` 返回值为 `action` 类型，如上 `createAction()` 返回值

```ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// 首先，创建thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)
```

在 `reducer` 中匹配处理 请求结果

```ts
const reducer1 = createReducer(initialState, {
  [fetchUserById.fulfilled]: (state, action) => {},
})

const reducer2 = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserById.fulfilled, (state, action) => {})
})

const reducer3 = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {},
  },
})

const reducer4 = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {})
  },
})
```

此外，`ReduxToolkit` 还提供了 <font color='#EA0000'>**`unwrap()`**</font> 以便我们在dispatch后，拿到原始的请求结果，进行<font color='#8600FF'>额外处理</font>

```ts
// 在组件中
const onClick = () => {
  // 在dispatch后，添加额外处理
  dispatch(fetchUserById(userId))
    .unwrap()
    .then((originalPromiseResult) => {
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    })
}
```

#### 注意：

* 使用 `redux tookit`时，有时可能会造成**<font color='#EA0000'>循环引用</font>**的问题

  如果按照 `slice` 拆分到组件中，可以更不容易出问题。



## TS下使用 `redux`

#### 创建`store`时

需要导出 state 中存储的状态类型

```ts
export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
});

// 获取 state 中存储的状态的类型
export type AppState = ReturnType<typeof store.getState>;
```

还需要导出 dispacth 类型

```ts
// 获取 dispatch 类型
export type AppDispatch = typeof store.dispatch;
```

#### 封装 `useSelector()`, `useDispatch()` Hook函数

以便组件中使用时有类型提示。

```ts
import { AppState, AppDispatch } from "./../store/index";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
```

#### 在组件中使用 

```tsx
import { useTypedDispatch, useTypedSelector } from "@/hooks/storeHooks";
import { setUserInfoAction } from "@/store/actions/index";

function Home() {
  const count = useTypedSelector((state) => state.count);
  const dispatch = useTypedDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(setUserInfoAction({}));
        }}
      >
        按钮
      </button>
      <div>{count}</div>
    </div>
  );
}

export default Home;
```

