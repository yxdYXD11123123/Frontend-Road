// 15.找出一个数组中有哪些重复元素，并且这些元素各重复了几次,var arr = [0,1,3,1,1,5,5,8,8,8,0,9,5]

// 步骤：
arr = [0,1,3,1,1,5,5,8,8,8,0,9,5]
// for循环遍历出所有元素
for (var i=0; i<arr.length; i++)
{
    for (var j=i+1; j<arr.length; j++)
    {
        if (arr[i]==arr[j])
        {
            console.log(arr[i]);
        }
    }
}