
//1.利用JavaScript的console实现在控制台输出”我是传智学院的一名学生，我为自己代言”
console.log('我是传智学院的一名学生，我为自己代言');

//2.利用JavaScript定义变量a，赋值为88，并且在控制台打印输出变量a的值
var a = 88          
console.log(a);

//3.利用JavaScript定义6个不同类型的变量，赋值，并且在控制台打印输出变量的类型
var er = '字符串'
var et = 100
et = '数字'
var ey = true
ey = '布尔'
var eu
var ei = {
    name: 'kks' ,
    leixing: '对象'
}
var eo = [12,13,'数组']
console.log(er,et,ey,eu,ei.leixing,eo[2])

//4.声明两个变量,第一个变量为num1,值为123,第二个变量为num2,值为456,实现两个变量值的交换,即让num1为456,让num2为123;
var num1 = 123       
var num2 = 456
// num1 = 456        //方法一
// num2 = 123

var num3 = num1      //方法二
num1 = num2
num2 = num3
console.log(num1,num2)

//5.输出如下代码的执行结果:
var myVarVariable = 666        
const myConstVariable = 2
console.log(myVarVariable);   //666
console.log(myConstVariable); //2
myVarVariable = 888;
// myConstVariable = 5;   //报错，因为常量不能改变
console.log(myVarVariable);   //888
console.log(myConstVariable); //2

// 6.自定义一个对象：对象拥有年龄，学号，姓名，身高，体重，手机号等属性(这个代码敲三遍，创建3个不同的对象，非常重要)
// 要求：
// 1. 通过2种方式定义对象
// 2. 通过2种方式给对象添加一个属性 gender,值是"男"
// 3. 获取属性姓名和年龄的值
// 4. 删除属性体重
var person1 = {
    age : 20,
    nums : 10,
    name : 'yuan',
    height : 165,
    weight : 100,
    phoneNumber : 12121212
}
var person2 = {
    age : 22,
    nums : 2,
    name : 'xu',
    height : 170,
    weight : 120,
    phoneNumber :131313131
}
var person3 = {
    age : 24,
    nums : 3,
    name : 'dong',
    height : 178,
    weight : 130,
    phoneNumber : 141414141
}
/*
var person1 = new Object ({
})  第二种定义方式
var person2 = new Object ({
})
var person2 = new Object ({
}) 
*/
person1.gender = '男'
var gender2 = 'gender2'
person2[gender2] = '男'
console.log(person1,person2,person3)
console.log(person1.name,person2.age)//获取姓名和年龄的值
delete person1.weight //删除属性体重
console.log(person1)
