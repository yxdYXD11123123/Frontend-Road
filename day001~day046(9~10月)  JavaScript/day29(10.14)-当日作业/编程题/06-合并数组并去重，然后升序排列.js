// 6.现在有2个数组，var arr1 = [1,7,9,11,8,15,10,19],var arr2 =[2,1,6,8,10]将2个数组合并为一个数组，并将数组去重，然后按照升序进行排列

// 分析：先合并两个数组，然后用for循环给数组去重，然后用sort()将其从小到大排列

// 步骤：
var arr1 = [1,7,9,11,8,15,10,19]
var arr2 = [2,1,6,8,10]
var arr = arr1.concat(arr2)
console.log(arr);
// 去重
for (var i=0; i<arr.length; i++)
{
    for (var j=i+1; j<arr.length; j++)
    {
        if (arr[i]==arr[j])
        {
            arr.splice(j,1)
            j--
        }
    }
}
console.log(arr);
// 升序排列
arr.sort(function(a,b){
    return a-b
})
console.log(arr);

