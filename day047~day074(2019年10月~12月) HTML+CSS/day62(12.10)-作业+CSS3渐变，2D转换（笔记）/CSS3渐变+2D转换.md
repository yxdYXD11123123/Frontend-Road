## `CSS`渐变

### 线性渐变

就是沿着某个方向进行颜色上的渐变，可以使用左右上下以及对角线。

```css
选择器 {
	background-imgage:linear-gradient(方向，起始色，终点色);
}

div {
            width: 200px;
            height: 200px;
            border: 1px solid black;
            /* 方向：上下左右   度数 */
            background-image: linear-gradient(to left top, hotpink, skyblue);


            /* 0deg时和向上是一样的 */
            background-image: linear-gradient(0deg, red, white);
            /* 有的时候  需要出现间隔明显的渐变 */
            background-image: linear-gradient(90deg, red 0%, red 50%, hotpink 50%, hotpink 100%);
            /* 相当于 */
            background-image: linear-gradient(90deg, red 50%, hotpink 50%);


            /* 百分比相对于的值是background-size的值 */
            background-image: linear-gradient(90deg, white 0px, white 20px, black 20px, black 40px);
            /* 相当于 */
            background-image: linear-gradient(90deg, white 50%, black 50%);
            background-repeat: repeat-x;
            background-size: 40px;
        }
```



### 径向渐变

就是从某个点开始进行颜色上的渐变

```css
选择器 {
    /* 默认的圆心为中心 */
    /* 主轴和次轴一样是正圆  否则是椭圆 */
    background-image: radial-gradient(主轴 次轴 at 圆心x 圆心y, 颜色 距离， 颜色 距离...);
}
```

**箭靶练习**

```css
div {
            width: 200px;
            height: 200px;
            border: 1px solid black;
            background-image: radial-gradient(100px 100px at center center, red 5%, black 5%, black 25%, white 25%, white 45%, black 45%, black 65%, white 65%, white 85%, black 85%, black 105%, white 105%, white 100%);
        }
```

利用repeating-radial-gradient做箭靶效果

```css
div.two {
            width: 200px;
            height: 200px;
            border: 2px solid hotpink;
            background-image: repeating-radial-gradient(20px 20px, black 0%, black 50%, white 50%, white 100%);
        }
/* .two和.three的效果完全相同 */
div.three {
            width: 200px;
            height: 200px;
            border: 2px solid hotpink;
            background-image: repeating-radial-gradient(black 0px, black 10px, white 10px, white 20px);
        }
```



## `2D` 转换(transform)

### translate(水平，竖直)

**作用**：让元素进行水平和垂直位移的  永远相对于自己（左上角）进行移动

**布局方式**：标准流布局 即使使用translate移动了元素  原来的位置也不会被侵占

#### 应用:

可以利用translate让定位的元素 垂直水平居中

```css
        /*以前的方法*/
		/* div.son {
            position: absolute;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            border: 3px solid indigo;
            top: 50%;
            left: 50%;
            margin-top: -20px;
            margin-left: -20px;
        } */

		/*现在的方法*/
        div.son {
            position: absolute;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            border: 3px solid indigo;
            top: 50%;
            left: 50%;
            /* 优点在于：即使不知道盒子大小也可以很方便地使其居中 */
            transform: translate(-50%, -50%);
        }
```



### rotate(度数) 旋转

**作用**：让元素进行旋转   度数越大，顺时针旋转   度数越小，逆时针旋转

`负值时，直接逆时针旋转，正值时，顺时针旋转`

```css
	div {
            width: 200px;
            height: 200px;
            background-image: linear-gradient(to top left, hotpink, skyblue);
            margin: 100px auto;
            transition: all 2s linear;
        	/*设置转换原点*/
            transform-origin: 20px 20px;
        }

    div:hover {
            transform: rotate(90deg);
        }
```

#### transform-origin 转换原点

`transform-orgin: center center` 单位有方位词|具体的像素|百分比

### scale() 缩放

**语法**：以 1 为界限  大于1是放大， 大于0小于1是缩小

### skew(度数)  倾斜

以斜切原点为左上角

`transform: skew(x轴度数)`

或`transform: skew(x轴度数,0)`

或`transform: skewX(度数)` 

元素是按照垂直方向x轴，逆时针旋转的

`transform: skew(0, y轴度数)`

或`transform: skewY(度数)`

元素是按照水平方向y轴，顺时针旋转的

