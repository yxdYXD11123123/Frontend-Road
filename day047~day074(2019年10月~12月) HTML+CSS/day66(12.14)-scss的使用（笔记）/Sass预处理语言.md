# `CSS` 扩展语言

`css`预处理器：sass(预处理语言) less(预处理语言) stylus(预处理语言) `postcss`(后处理语言/专门来补充兼容性的)

## 为什么要学习`css`扩展语言

统一管理

# Sass

这一代的`sass`被称为`scss`

### sass的编译

1. 需要给`vscode`安装实时编译插件 Live Sass Compiler

2. 在`vscode`的状态栏右下角有一个 watch sass 点一下就自动编译了

## 注释

**静默注释：**//  不会被编译到`css`文件中，静默注释是给开发者看的

**注释： ** /* 多行注释   `css`中的注释   会被编译到`css`文件中 */

## 变量

为了少写代码，好修改代码

### 语法：

`$变量名: 变量值;`

```scss
$white: white;
header {
    background-color: $white;
}

$normalBorder: 1px solid red;

$blockCenter: 0 auto;
```

提示：变量名希望使用小驼峰命名法

### 作用：

方便设计修改设计方案  让前端修改页面的配色方案

## 嵌套

减少代码，增加层次感

```scss
.flash-title-bottom {
    float: left;
    width: 17px;
    height: 711px;
    a {
        border-right: $normalBorder;
        span {
            color: #333333;
        }
    }

    i {
        line-height: 22px;
    }
}
```

转为

```css
.flash-title-bottom {
  float: left;
  width: 17px;
  height: 711px;
}

.flash-title-bottom a {
  border-right: 1px solid red;
}

.flash-title-bottom a span {
  color: #333333;
}

.flash-title-bottom i {
  line-height: 22px;
}
```

### 父级选择器 &

```scss
article a {
    color: blue;
    &:hover {
        color: red;
    }
}
```

转为

```scss
article a {
  color: blue;
}

article a:hover {
  color: red;
}
```

### 群组选择器的嵌套

```scss
.container {
    h1,h2,h3 {
        margin: 0 auto;
    }
}
```

转成

```css
.container h1, .container h2, .container h3 {
  margin: 0 auto;
}
```

### 子组合选择器和同层组合选择器：>  +  和 ~ ;

">" 代表：直接子代选择器

“+” 代表：某个元素后面紧跟着的那一个兄弟元素

"~" 代表：某个元素后面的所有兄弟元素

```scss
article {
    ~ article {
        border-top: 1px dashed #cccccc;
    }
    > footer {
        background-color: #eee;
    }
    dl {
        > dt {
            color: #333333;
        }
        > dd {
            color: #555555;
        }
    }
    nav + & {
        margin-top: 0px;
    }
}
```

转为

```css
article ~ article {
  border-top: 1px dashed #cccccc;
}

article > footer {
  background-color: #eee;
}

article dl > dt {
  color: #333333;
}

article dl > dd {
  color: #555555;
}

nav + article {
  margin-top: 0px;
}
```

### 导入Sass文件

没有下划线的会被编译，有下划线的不会被编译

作用：我们可以将大项目中的多种变量分类在不同sass文件中（然后在这些文件名前加上" _ "），这样这些文件就不会被编译，我们在最后一个sass文件中引入所有未编译的sass文件，一起编译。

语法：@import "sass的文件名"

### 混合器（`mixins`）混合宏

作用：混合器像函数一样   封装的是一段具有具体功能的代码

定义：`@mixin 混合器的名字(参数：默认值, ...) { 具体某个功能的代码 }`

调用：`选择器 { @include 混合气的名字(实参) }`

```scss
@mixin center-box($height, $width) {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -calc($height / 2);
    margin-left: -calc($width / 2);
}

.son {
    width: 100px;
    height: 100px;
    @include center-box(100px, 100px)
}
```

转为

```css
.son {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -calc(50px);
  margin-left: -calc(50px);
}
```

### 继承

作用：就是写代码的另外一种方式，继承用的好，可以大量的减少代码

语法：@extend 选择器的名字

注意：继承是一把双刃剑，用的好，可以极大的减少代码，用的不好，会出现冗余代码

### sass中的@import 和 `css`中的@import 有什么区别

sass是开发时使用，先编译，后上线使用，压根儿就不存在多个`css`引用的问题，只是在编译过程中需要点时间，但是上线之后丝毫不影响用户体验，所以推荐用。

`css`是上线之后网页加载需要样式的时候下载，如果在`css`中使用@import 会让网页渲染变慢，所以是无用功。



# 私有前缀

```css
div {
    display: -webkit-box;
    display: -ms-flexbox;  
    display: flex;
}
```

#### 为什么要有私有前缀

`css`是不断开发的  `css3`是2000发布的`css3`  没有以后了

`-ms-` 是IE           `-webkit-`是苹果和谷歌     `-moz-`  火狐    

查看新特性的浏览器