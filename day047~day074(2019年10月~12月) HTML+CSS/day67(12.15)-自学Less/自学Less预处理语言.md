# Less

Less(Leaner Style Sheets的缩写) 可以运行在 Node 或 浏览器端

### 在浏览器环境中使用Less

`link rel="stylesheet/less" type="text/css" href="styles.less" />`

## 变量

less用@命名变量名，`scss`用$命名变量名

变量会延迟加载（读完同一作用域再完成最终编译）

1. 作为选择器和属性名：@{选择器/属性名} 

   ```less
   @colorone: blue;
   @m: margin;
   @selector: .box;
   @{selector} {
       background-color: @colorone;
       @{m}: 100px;
   }
   ```

2. 作为URL：@{url}

```less
@width: 10px;
@height: @width + 10px;

#header {
    width: @width;
    height: @height;
}
```

编译为：

```css
#header {
    width: 10px;
    height: 20px;
}
```

## 混合（`Mixins`）

在Less中定义混合以 “ . ” 开头

是一种将一组属性从一个规则包含（或混入）到另一个规则集的方法。

```less
/*定义混合*/
.center-center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
/*定义含参数的混合*/
/*参数的默认值是100px*/
.center-fifty(@width:100px , @height:100px) {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -@width / 2;
    margin-left: -@height / 2;
}


.father {
    /*调用普通混合*/
    .center-center();
    /*
    调用有参数的混合
    .center-fifty(@height:100px ,@width:100px)；
    在输入参数时，可以根据指定形参名字，只传入部分实参到指定形参
    */
    width: 100px;
    height: 100px;
    background-color: springgreen;
    &:hover {
         background-color: teal;
    }
}
```

转为

```css
.father {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  background-color: springgreen;
}
```

### 继承

语法：选择器:extend(继承的混合器 all);

加all继承所有的状态。

less继承与less混合最大区别就是less继承不能传参。
性能比混合高，但灵活度比混合低。

```less

.inherit {
  display: inline-block;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.inherit:hover{
  background-color:yellow;
}
 
.test {
  width: 400px;
  height: 400px;
  border: 1px solid red;
  position: relative;
 
  .test1:extend(.inherit all) {
    width: 100px;
    height: 100px;
    border: 1px solid blue;
  }
 
  .test2:extend(.inherit all) {
    width: 50px;
    height: 50px;
    border: 1px solid yellow;
  }
}
```

转为

```css
.inherit,
.test .test1,
.test .test2 {
  display: inline-block;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.inherit:hover,
.test .test1:hover,
.test .test2:hover {
  background-color: yellow;
}
.test {
  width: 400px;
  height: 400px;
  border: 1px solid red;
  position: relative;
}
.test .test1 {
  width: 100px;
  height: 100px;
  border: 1px solid blue;
}
.test .test2 {
  width: 50px;
  height: 50px;
  border: 1px solid yellow;
}
```

### 匹配模式

```less
.sjx {
    position: absolute;
    top: 0;
    left: 0;
    /*在调用混合时，参数前加上匹配名*/
    .triangle(B, 10px, white);
}
/*在形参前加上@_，每次调用这个混合其它匹配模式时，这部分代码都会加入其中*/
.triangle(@_,@width,@color ) {
    width: 0;
    height: 0;
}
.triangle(T, @width, @color) {
    border-top: @width solid @color;
    border-bottom: @width solid transparent;
    border-left: @width solid transparent;
    border-right: @width solid transparent;
}
.triangle(B, @width, @color) {
    border-top: @width solid transparent;
    border-bottom: @width solid @color;
    border-left: @width solid transparent;
    border-right: @width solid transparent;
}
.triangle(R, @width, @color) {
    border-top: @width solid transparent;
    border-bottom: @width solid transparent;
    border-left: @width solid @color;
    border-right: @width solid transparent;
}
.triangle(L, @width, @color) {
    border-top: @width solid transparent;
    border-bottom: @width solid transparent;
    border-left: @width solid transparent;
    border-right: @width solid @color;
}
```

转为

```css
.sjx {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid white;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
```

## 计算

可以直接进行算术计算，无需calc()

```less
 border-bottom: (10px + 10px) solid black;
```

转为

```css
border-bottom: 20px solid black;
```

## 嵌套（Nesting）

<font color=red>嵌套</font>用法如`scss`

## 映射（Maps）

在Less 3.5 版本开始，可以将混合（`mixins`）和 规则集（`rulesets`）作为一组值得映射（map）使用

```less
#colors() {
    primary: blue;
    secondary: green;
}

.button {
    color: #colors[primary];
    border: 1px solid #colors[secondary];
}
```

转为

```css
.button {
    color: blue;
    border: 1px solid green;
}
```

### 避免编译

语法：~ "不被编译的内容"