## vite React 使用 Ant Design Mobile

### 安装

`npm install antd-mobile --save`

### 使用

* 引入样式

  ```js
  import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
  ```

### 按需加载 

* 因为vite不支持官方推荐的[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 

  需要使用其他插件

  `yarn add -D vite-plugin-babel-import`

* 在 `vite.config.js` 中使用

  ```jsx
  import vitePluginImport from 'vite-plugin-babel-import'
  ……
  plugins: [
      reactRefresh(),
      vitePluginImport([
        {
          libraryName: 'antd-mobile',
          libraryDirectory: 'es',
          style(name) {
            return `antd-mobile/lib/${name}/style/index.css`
          },
        },
      ])
    ]
  ```

  



## 使用 vite 创建 React 项目 

### 使用 scss

* 直接安装 

  `yarn add -D sass`

* 因为 vite 默认支持 CSS Module 格式，所以可以直接修改 CSS 文件名为 CSS Module 格式即可，无需配置

  ```
  index.css --> index.module.css
  index.scss --> index.module.scss
  index.less --> index.module.less
  ```



### 配置路径别名

* 在 *vite.config.js* 中配置

  ```js
  export default defineConfig({
  	...
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },
  })
  ```



## 根据当前地址选中tabbar

* <font color=red>直接使用`props` 中提供的 `location` 属性</font>

  为什么不使用 `history` 中的location呢，因为history中的location变化时，不会触发 组件更新（出现这种情况的原因在于：<font color=blue>react决定是否更新是根据<font color=red>浅层对比</font>数据是否发生变化</font>, 所以 `props.location` 变化就可以触发更新，`props.history.location` 变化就不会触发更新）

```jsx
        {/* 底部导航 start */}
        <div className="tabbar" >
          <TabBar barTintColor="#fff" unselectedTintColor="#9b9b9b" tintColor="#75bea1" tabBarPosition="bottom" hidden={this.state.hiddenTabbar}>
            {this.state.tabbarList.map(val => (
              // 导航项
              <TabBar.Item
                key={val.path}
                title={val.title}
                // 如果当前路由中含有 对应path，则选中
                selected={this.props.location.pathname.includes(val.path)}
                // 点击跳转对应路由
                onPress={() => { this.props.history.push(val.path) }}
                icon={<i className={"iconfont " + val.iconName}></i>}
                selectedIcon={<i className={"iconfont " + val.iconName}></i>}
              />
            ))}
          </TabBar>
        </div>
        {/* 底部导航 end */}
```

