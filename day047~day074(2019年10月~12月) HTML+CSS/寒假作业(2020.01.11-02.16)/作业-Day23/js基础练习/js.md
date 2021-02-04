## js解答题

1. 字符串的特性是什么？

   不可变性

2. 使用字符串方法返回指定下标(索引) 对应的字符和不使用字符串方法返回字符的方式分别是什么？

   使用方法：str.charAt(索引)

   不使用用方法：str[索引]

3. 查看某个字符串是否存在于字符串中的某个方法是？其返回值为-1或者0分别代表的是什么？

   str.indexOf(字符串)

   -1代表字符串中不存在

   0代表存在，并且在字符串中的索引位置为0

4. 截取字符的三种方法是什么，分别有什么不同？

   str.substr(开始的位置，截取字符的个数)

   str.slice(开始的位置，结束的位置) 

   str.substring(开始的位置，结束的位置) 开始位置和结束位置可以互换

   共同点：

   1. 如果只写一个参数，代表从这个位置一直截取到最后
   2. 如果不写参数，返回整个字符串



## js编程题

1. 将字符串 var str="abcdefgh"进行反转，结果是 "hgfedcba"
```js
var str = "abcdefgh"
str = str.split("").reverse().join("")
console.log(str);

```

2. 截取字符串 “我爱中华人民共和国”  中 '中华' 输出到控制台中
```js
let str = "我爱中华人民共和国"
console.log(str.substr(2, 2));
```

3. 获取url中的用户名和密码 https://www.test.com/login?name=zs&pwd=123,并且控制台输出对象的格式{name:'zs',pwd:123}

```js
let url = "https://www.test.com/login?name=zs&pwd=123"
function getObj(url) {
    url = url.split('?')[1].split("&")
    let obj = new Object();
    for (let i = 0; i < url.length; i++) {
        obj[url[i].split('=')[0]] = url[i].split('=')[1]
    }
    return obj;
}
console.log(getObj(url));
```
4. var str= 'qweqweoeqweroqweqweodfsfdo'
    1)查找字符串中所有字母 'o'出现的位置
    2)把字符串中的所有字母'o'替换成 '-';

  ```js
var str = 'qweqweoeqweroqweqweodfsfdo'
str = str.split("")
for (let i = 0; i < str.length; i++) {
    if (str[i] == 'o') {
        console.log(i);
        str[i] = "-"
    }
}
str = str.join("")
console.log(str);
  ```