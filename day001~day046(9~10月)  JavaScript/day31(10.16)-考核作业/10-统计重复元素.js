// 找出一个数组中有哪些重复元素，并且这些元素各重复了几次,var arr = [0,1,3,1,1,5,5,8,8,8,0,9,5]
var arr = [0,1,3,1,1,5,5,8,8,8,0,9,5]
// 定义一个空对象，对象中，键为元素，键值为元素出现次数
var obj = {}
//
for (var i=0; i<arr.length; i++)
{
    // 如果已经存在这个元素的键，那么给键值加1
    if (obj[arr[i]])
    {
        obj[arr[i]]++
    }else {
        // 如果这个对象里没有这个键，那么添加一个新的键，键值为1
        obj[arr[i]]=1
    }
}
console.log(obj);

// 循环对象中的键值对
for (var key in obj)
{
    console.log(`${key}元素，重复${obj[key]-1}次`);
}
