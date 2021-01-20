//  需求：将数组[2, 0, 6, 1, 77, 0, 52, 0, 25, 7]中的 0 去掉后，形成一个不包含 0 的新数组。

//  分析：循环遍历数组中所有的元素，判断元素是否为0，如果为0，跳出循环，不计入新数组

// 步骤：
var arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7]
var arrnew = []
for (var i=0; i<arr.length; i++)
{
    if (arr[i]==0)
    {
        continue
    }
    arrnew.push(arr[i])
}
console.log(arrnew);
