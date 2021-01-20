// 3、定义一个5位数,判断 该五位数是否为回文数。（判断第一位和第五位是否一样，第二位和第四位是否一样）

var a = 54345
var gewei = a%10
var shiwei = parseInt(a/10%10)
var baiwei = parseInt(a/100%10)
var qianwei = parseInt(a/1000%10)
var wanwei = parseInt(a/10000)
if (gewei==wanwei && shiwei==qianwei)
{
    console.log(`${a}这个数是回文数`);
}
else 
{
    console.log(`${a}这个数不是回文数`);
}
