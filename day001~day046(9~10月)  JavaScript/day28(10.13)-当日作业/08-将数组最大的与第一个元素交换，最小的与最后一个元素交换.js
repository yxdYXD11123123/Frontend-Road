//  需求： 18.请编程实现数组最大的与第一个元素交换，最小的与最后一个元素交换，然后打印数组内容, var arr = [1,2,4,5,7,7,666,0,-1,-2,-3]

//  分析：先用循环遍历出所有数，并且挑出最大值和最小值，保留到两个新的变量中，然后将其分别与第一个元素和最后一个元素交换

//  步骤：
var arr = [1,2,4,5,7,7,666,0,-1,-2,-3]
var da = arr[1]
var xiao = arr[1]
for (var i=0; i<arr.length; i++)
{
    if (da<arr[i])
    {
        da = arr[i]
    }
    if (xiao>arr[i])
    {
        xiao = arr[i]
    }
}
// console.log(da,xiao);

for (var j=0; j<arr.length; j++)
{
    if (arr[j]==da)
    {
        arr[j] = arr[0]
    }
    if (arr[j]==xiao)
    {
        arr[j] = arr[arr.length-1]
    }
}
arr[0] = da
arr[arr.length-1] = xiao
console.log(arr);

