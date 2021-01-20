// 4.   筛选数组
//  需求： 将数组 [2, 0, 6, 1, 77, 0, 52, 0, 25, 7] 中大于等于 10 的元素选出来，放入新数组。

//  分析：用for循环遍历出旧数组所有元素，然后筛选出符合条件的元素，排入新的数组

//  步骤：
var arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7]
var arrnew = []
for (var i=0; i<arr.length; i++)
{
    if (arr[i]>=10)
    {
        arrnew[arrnew.length] = arr[i]
        // 方法二： 
        //  arrnew.push(arr[i])
    }
}
console.log(arrnew);
