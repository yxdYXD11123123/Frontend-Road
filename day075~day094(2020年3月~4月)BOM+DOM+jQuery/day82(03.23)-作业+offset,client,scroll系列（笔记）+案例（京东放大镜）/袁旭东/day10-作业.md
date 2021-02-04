# 选择题

1. 下列关于offsetleft和style.left说法中正确的是（B）

   A、offsetleft返回的是字符串，style.left返回的是数值<font color=red>相反</font>

   B、style.left是读写的，offsetleft是只读的，所以要改变div的位置，只能修改style.left

   C、offsetleft的值需要事先定义<font color=red>（不需要事先定义）</font>，否则读取到的值为空

   D、如果父div的position定义为relative，子div的position定义为absolute，那么子div的style.left的值是相对于父div的值，这与offsetleft是相同的<font color=red>不相同</font>

2. 下列关于offsetWidth和offsetHeight的说法正确的是(A)

   A、可以获取行内及内嵌的宽高 

   B、获取到的值是一个string类型，带单位 <font color=red>数字类型，不带单位</font>

   C、获取的宽高包含border和padding和margin <font color=red>不包含margin</font>

   D、不仅能读取，还能设置值 <font color=red>不能设置</font>

3. 下列关于offsetParent说法错误的是( D)

   A、如果元素自身是固定定位（fixed），则定位父级是null

   B、如果元素自身是非固定定位,并且父元素有定位，那么它的定位父级是最近的那个父级元素

   C、如果元素自身是非固定定位,并且所有的父元素都没有定位，那么它的定位父级是body

   D、body的定位父级是html <font color=red>null</font>

4. 下列关于offset系列说法错误的是(D)

   A、offsetWidth用于获取元素的真实宽度(除了margin以外的宽度)

   B、offsetLeft可以用于获取元素到最近的定位父盒子的左侧距离

   C、offsetParent用于获取该元素中有定位的最近父级元素

   D、offsetLeft 和 offsetTop只能获取到有定位元素的left值和top值

5. 下列哪个属性不是事件对象 的属性(C )

   A、clientX

   B、pageX

   C、offsetLeft

   D、target


# 简答题

第1题. offset和style的区别是什么？
```js
offset的值可读但是不可写，而且获取到的值是数字类型，不带单位

style的值可读可写，但是在js中style只能获取到html中的行内样式，而且值是带单位的字符串
```
第2题. offsetWidth与offsetHeight的注意点有哪些？
```js
1. 可读不可写
2. 获取的是数字类型，不带单位
3. 包括content+padding+border(不包括margin)
```
第3题. offsetLeft与offsetTop的注意点有哪些？

```js
1. 相对的是一个有定位的祖先元素，从父级元素一层一层往上找，找到第一个有定位的元素相对计算
2. 如果没有有定位的祖先元素，那么相对于body计算
```

# 编程题

 今天的综合案例敲三遍，讲的综合案例每句代码上面写上注释，明天交给组长的就是综合案例和这个.md文件的代码

