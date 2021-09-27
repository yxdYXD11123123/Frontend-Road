## Props 验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组

<font color=red>需要注意的是 null 和 undefined会通过任何类型验证</font>

```js
export default {
  props: {
    msg: {
      // 可以通过的类型
      type: [String, Number],
      // 必传
      required: true,
      // 默认值 (对象或数组默认值必须从一个工厂函数获取)
      default: function () {
        return "one two";
      },
      // 必须有 s / v 字符
      validator: function (value) {
        return ["s", "v"].indexOf(value) !== -1;
      },
    },
  }
};
```



### Prop的大小写命名

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，`camelCase` (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // camelCase in JavaScript
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!"></blog-post>
```