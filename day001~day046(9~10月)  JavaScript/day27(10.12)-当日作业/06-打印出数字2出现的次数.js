//  6. var arr = [1,1,2,2,3,4,5,4,3,2,1], 打印出数字2出现的次数。

//  分析：用for循环遍历出数组的所有数，在循环内判断2出现的次数

//  步骤：
var arr = [1,1,2,2,3,4,5,4,3,2,1]
var time = 0
for (var i=1; i<=arr.length; i++)
{
    if (arr[i]==2)
    {
        time++
    }
}
console.log(time);
