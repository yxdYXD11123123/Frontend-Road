# 选择题

1. 下面选项中( C)能够获取滚动条距离页面顶端的距离的

   A、scrollHeight

   B、onscroll

   C、scrollTop

   D、top 

2. 下面可以获取浏览器在卷动后，隐藏的文档部分的高度的属性是( B)
   
    A window.body.scrollTop <font color=red>滚动出去的距离：document.documentElement.scrollTop, window.pageYOffset, document.body.scrollTop</font>
   
    B document.body.scrollTop;
   
    C document.scrollTop;
   
    D documentElement.body.scrollTop

3. 下列关于clientHeight说法正确的是(B )

   A、clientHeight获取元素在可视区域的高度，包括边框

   B、clientHeight获取元素在可视区域的高度，包含padding

   C、clientHeight指元素本身的可视内容，不包括overflow被折叠起来的部分

   D、clientHeight获取元素在可视区域的高度，包括滚动条的高度，以及包括padding

4. 下列关于offsetHeight、clientHeight、scrollHeight的计算说法正确的是(C)
   
   A、offsetHeight：height + padding + border+margin<font color=red>没有margin</font>

   B、clientHeight： height + padding + border <font color=red>没有border</font>

   C、scrollHeight：大小是内容的大小 （可能超过offsetHeight）

   D、scrollHeight：元素中内容的实际高度(有边框)<font color=red>无边框</font>，如果内容不足,就是元素的高度


5. 下列关于scrollHeight和scrollWidth说法错误的是(C)

   A、scrollHeight 和 scrollWidth 属性为只读属性 ​

   B、scrollHeight 和 scrollWidth返回的数值是包括当前不可见部分的。

   C、使用scrollHeight和scrollWidth属性返回元素的高度，单位为px,包括padding和border

   D、scrollHeight和scrllWidth中如果元素内容不足，就是元素的高度和宽度


# 简答题

第1题. client系列包含哪些属性，分别有什么作用？ 
```js
clientLeft 获取元素左边框的宽度
clientTop 获取元素上边框的宽度
clientWidth 获取元素内容+padding的宽度（不包括border）
clientHeight 获取元素内容+padding的高度（不包括border）
```
第2题. scroll系列包含哪些属性，分别有什么作用？
```js
scrollLeft 获取元素的内容超出左边框的宽度
scrollTop 获取元素的内容超出上边框的宽度
scrollWidth 获取元素内容的实际宽度（包括超出的内容）
scrollHeight 获取元素内容的实际高度（包括超出的内容）
```

# 编程题

1. 返回顶部效果(附件:返回顶部):

- 页面和功能都需要自己写出来
- 具体效果请看视频，需要自己总结需求，自己完成

2. 楼梯导航效果，在老杨的课件里面，试着自己完成,里面的返回功能自己也去实现


注意：  

- 把上课讲的代码都敲三遍，尤其是不会得同学，我在抽部分学生敲代码的情况，班级有人竟然一遍也不写，
- 如果你觉得你都会了，不需要写了，跟我说明一下，明天上午我会查一部分人敲三遍代码的情况
- 希望在家有一个对自己负责任的态度





