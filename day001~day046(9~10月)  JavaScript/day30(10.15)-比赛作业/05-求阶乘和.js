//  5、求1!+2!+3!+...+20!的和
var sum = 0
for (var i=1; i<=20; i++)
{
    var jie = 1
    for (var j=1; j<=i; j++)
    {
        jie = jie*j
    }
    sum += jie 
}
console.log(sum);
    