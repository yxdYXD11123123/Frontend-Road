//  12. 定义2个长度为5的字符串数组arrA和arrB，arrA包含元素["a","b","c","d","e"];遍历arrA中的所有元素并按逆序存储在数组arrB中，并按arrB下标增长的顺序在控制台打印输出arrB数组中所有元素，arrB的结果如下，var arrB = ["e","d","c","b","a"]

// 步骤：
// 定义2个长度为5的字符串
var arrA = new Array(5)
var arrB = new Array(5)
// 给arrA添加元素
var arrA = ["a","b","c","d","e"]
// 动用一个for循环，倒序遍历出arrA中的所有元素
for (var i=arrA.length-1; i>=0; i--)
{
    var j=4-i
    
    arrB[j]=arrA[i]
}
console.log(arrB);


