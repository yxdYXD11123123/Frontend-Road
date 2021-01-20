//  需求：3. 数组转为字符串，将数组['red','green','blue','pink']转为字符串并且用 | 或其他符号分割

// 分析：用for循环遍历出所有元素，然后准备一个保留字符串的变量，将元素存入字符串

// 步骤：
var zi = ''
var arr = ['red','green','blue','pink']
for (var i=0; i<arr.length; i++)
{
    zi = zi + arr[i]+'|'
}
console.log(zi);
