//  需求：将数组 ['top', 'right', 'bottom', 'left', 'center'] 的内容反过来存放

//  分析：利用for循环，初始值为数组长度-1，一直到0，反向遍历元素，在声明一个空数组，将其放入新空数组中

// 步骤：
var arr = ['top', 'right', 'bottom', 'left', 'center']
var arrnew = []
for (var i=arr.length-1; i>=0; i--)
{
    arrnew.push(arr[i])
}
console.log(arrnew);
