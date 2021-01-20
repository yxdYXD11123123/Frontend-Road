//  需求：等腰三角形

for (var i=1; i<=5; i++)
{
    var kong = ''
    for (var k=5; k>=i; k--)
    {
        kong = kong + ' '
    }
    
    var star = ''
    for (var s=1; s<=i; s++)
    {
        star = star + '* '
    }
    console.log(kong+star);
}