// 将一个一维数组，var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
// 通过一定方法，转成二维数组 var newarr = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18]]

// 分析：先用循环，循环内每次用slice拷贝部分元素

// 步骤：
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
var newarr = []
// 用循环，循环步进为6, 步进为6是因为6个元素分一组，这样的话循环三次即可
for (var i=0; i<arr.length; i+=6)
{
    // 将旧数组6个元素为一组分割下来，填入新数组，1-6，7-12，13-18
    newarr.push(arr.slice(i,i+6))
}
// 输出
console.log(newarr);

// 方法二：
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
var newarr = []
var arr1 = []
for (var i=0; i<arr.length; i++)
{
    arr1.push(arr[i])
    if (arr1.length===6)
    {
        newarr.push(arr1)
        arr1=[]
    }
}
console.log(newarr);
