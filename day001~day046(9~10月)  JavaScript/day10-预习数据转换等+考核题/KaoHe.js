//1. 定义一个数组，保存六种数据类型的名称？
var strong = ['数字','字符串','布尔','对象','数组',null]
console.log(strong);

//2. 定义一个对象，保存你自己的名字、年龄、爱好？
var me = {
    name : 'yuan',
    age : 22,
    hobby : 'computerGame'
}
console.log(me)

//3. 有一个数组：var arr = [12,43,54,43]，写代码计算数组中第1个元素和第3个元素的和？
var arr = [12,43,54,43]
console.log(arr[0]+arr[2])

//4. 定义一个二维数组（随便放些数据进去）？
var erWei = [1,2,3,4,5,6,7,8,[1,2,3,4,54,6]]

//5. 有两个变量 a 和 b ，请写代码交换这两个变量的值？
var a = 1
var b = 2
var c = a 
a = b
b = c
console.log(a,b);

//6. 有一个对象： var obj = {name:'tom',age:10,books:['水浒','西游']} 
//   写代码打印出 name 属性和 books 中第2个元素？
var obj = {name:'tom',age:10,books:['水浒','西游']}
console.log(obj.name,obj.books[1]);

//7. 定义两个变量保存两个数字，然后再定义一个变量保存前两个变量的和？
var ab = 1
var ac = 2
var ad = ab + ac
console.log(ad);

//8. 定义一个包含多行和另一个变量值的字符串？
var bian 
var Duo = `哈哈哈哈哈\n哈哈哈\n哈哈,${bian}`
console.log(Duo);

//9. 定义一个数组，数组中保存两个对象，然后打印数组中第二个对象的随便一个属性？
var shuZu = [
    {
        name1:'do',
        age : 21
    },
    {
        name2:'it',
        age :22
    }
]
console.log(shuZu[1].name2);

//10. 有一个数组：var arr = [13,54,65,23,54]，写代码计算数组中第2个元素和第4个元素的和，并把和保存到第3个元素上 
var arr = [13,54,65,23,54]
arr[2] = arr[1] + arr[3]
console.log(arr);

//11.说出下面代码的运行结果,并且解释原因:
    var name = '张三';
    var age ;
    const gender ="女";
    name = "李四";
    console.log(name);   //李四
    console.log(age);    //undefined
    // gender = "男";     const是常量，改变常量值会报错
    console.log(gender);  //女

//12.下列变量名哪个不正确
    var sname ;  
    // var 1age ;   变量名不能以数字开头
    var Name;


    /*
    
    二、解答题
1、数据类型有几种？7种

2、什么是对象？如何创建对象？含有多个属性及属性值。var Obj = {}

3、如何读取和修改和删除对象中的值？obj.xx    delete obj.xx

4、什么时候会出现 undefined？var xx 未赋值

5、什么是数组？如何创建数组？把同一类数据放到一起组成数组

6、如何获取和修改数组中的某一个值？用元素下标，shuzu[1] = 1

7、js变量命名有什么规范？不能以数字开头，只能包含数字，字母，下划线，不能是关键字

8、如何定义多行字符串？有几种方法？两种方法，\n      `...`

9、Boolean 类型有几个值？分别代表什么？true false,真假

10、字符串中能解析变量吗？怎么解析？可以，用`...`代替'...',然后用${变量名}
    
    */