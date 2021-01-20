//9.	将字符串我是"我是中国人"，我爱我的祖国"种的中国人需要加上引号再控制台打印出来
var Chinese = '我是"中国人"，我爱我的祖国'  //第九题
console.log(Chinese)
var Chinese2 = "我是\'中国人\'，我爱我的祖国"
console.log(Chinese2)

//10.	定义一个数组，里面放都是数字的类型
// 要求：
// 1.把下标是3对应的元素获取到
// 2.把数组第一个元素修改成数字666
// 3.求出下标是2和4对应的元素的和赋值给下表是1

var shuZu = [12,13,14,15,16,21,15]  
console.log(shuZu[3])
shuZu[0] = 666
console.log(shuZu)
shuZu[1] = shuZu[2] + shuZu[4]
console.log(shuZu);

//11.定义一个数组，里面的元素要把今天所学的数据类型都用到
var ad     
var shuZu2 = [0b1011,032,0x6e,0.3,true,false,'zimu',{name:'yuan',age:10},ad]
console.log(shuZu2)

