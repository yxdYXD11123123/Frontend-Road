//  需求：4、利用JavaScript完成如下功能：如果今天是星期五，那么1000天后是星期几

//  分析：
var today = 5
for (var i=1; i<=1000; i++)
{
    today++
    if (today==8)
    {
        today=1;
    }
}
console.log('1000天后是周'+today);
