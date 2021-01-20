//  16.var arr = ['张三'，'李四'，‘王五’]
//    要求：将数组中的每一个数据拼接在一起，每个数据之间用 | 符合拼接。 如：‘张三|李四|王五

//  分析：准备一个变量作为空字符串

// 步骤：
var arr = ['张三','李四','王五']
var a = ''
for (var i=0; i<arr.length; i++)
{
    a = a + arr[i]
    if (i<arr.length-1)
    {
        a = a + ' | '
    }
}
console.log(a);
