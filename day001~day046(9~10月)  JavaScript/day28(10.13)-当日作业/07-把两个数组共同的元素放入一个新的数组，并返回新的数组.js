// 17. var arr1 = [1, 2, 3, "aaa", "hello", 999, -1];
//     var arr2 = [3, 78, "aaa", "bbb", 99, 1, -1, "hello"];
// 要求: 把两个数组共同的元素放入一个新的数组, 并返回新的数组

// 分析：用循环遍历两个数组中的每个元素，如果有元素在两个数组中都存在，那么将这些元素，放入新数组中

// 步骤：
var arr1 = [1, 2, 3, "aaa", "hello", 999, -1];
var arr2 = [3, 78, "aaa", "bbb", 99, 1, -1, "hello"];
var arrnew = []
for (var i=0; i<arr1.length; i++)
{
    for (var j=0; j<arr2.length; j++)
    {
        if (arr1[i]==arr2[j])
        {
            arrnew.push(arr1[i])
        }
    }
}
console.log(arrnew);


