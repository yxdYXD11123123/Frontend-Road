//12.定义一个数组，数组里面放2个对象，对象的属性有name,age,gender,studentId,属性值自己写
// 要求：
// 1.	输出第二个对象里面的属性name的值
// 2.	将第一个对象里面的属性gender的值修改成数字18
var person = [person1={name : 'yuan', age :22, gender:'男', studentId : 1212 },person2={name : 'xu', age :23, gender:'男', studentId : 1313 }]
console.log(person[1].name);
person[0].gender = 18;
console.log(person);
console.log(person[0].age+person[1].age)       

//13.定义一个数组，数组里面有一个对象，
//   对象里面有属性price,num,name,colors,colors的值是一个数组，获取colors数组下标是1的值
var Lian = [{             
    price : 1,
    num : 2,
    name : 3,
    color : [12,13,14]
}]
console.log(Lian[0].color[1])