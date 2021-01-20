// 13.定义2个长度为5的字符串数组arrA和arrB，arrA包含元素["a","b","c","d","e"];
// 遍历arrA中的所有元素并按逆序存储在数组arrB中，并按arrB下标增长的顺序在控制台打印输出arrB数组中所有元素，arrB的结果如下，var arrB = ["e","d","c","b","a"]

// 分析：将arrA逆序遍历，然后 让arrB的数组从0位开始,依次添加arrA循环遍历入的逆序元素

// 步骤：
// 定义数组
var arrA = ["a","b","c","d","e"];
// 定义一个数组  长度为5
var arrB = new Array(5)
// 逆序循环遍历arrA 
for (var i=arrA.length-1; i>=0; i--)
{
    // 让arrB的数组从0位开始,依次添加arrA循环遍历入的逆序元素
    arrB[arrB.length-1-i]=arrA[i]
}
// 输出arrB
console.log(arrB);
