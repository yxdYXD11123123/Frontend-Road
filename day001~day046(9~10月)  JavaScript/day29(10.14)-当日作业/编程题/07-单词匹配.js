// 7.定义一个长度为10的数组，在每一个元素存放一个单词，然后用户输入单词进行匹配，通过程序判断数组是否包含有这个单词，包含这个单词打印"YES",否则就是"NO"


var word = new Array(10)
var word = ['one','two','three','four','five','six','seven','eight','nine','ten']
var a = 'ten'
if (word.indexOf(a)>=0)
{
    console.log('Yes');
}
else 
{
    console.log('No');
}
