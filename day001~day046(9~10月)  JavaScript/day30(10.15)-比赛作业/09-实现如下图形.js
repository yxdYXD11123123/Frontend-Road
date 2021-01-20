/*
555555
44444
333
22
1
22
333
4444
55555
*/

for (var i=5; i>=1; i--)
{
    var hang = ''
    for (var j=1; j<=i; j++)
    {
        hang = hang + '' + i 
    }
    console.log(hang);
}
for (var s=2; s<=5; s++)
{
    var hang1 = ''
    for (var x=5-s; x<=4; x++)
    {
        hang1 += ''+ s
    }
    console.log(hang1);
}
