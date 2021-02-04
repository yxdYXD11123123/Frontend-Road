let str = "yuan yuan yuan jiang jiang yong aaaaaaaaaaaaa aaaaaaaaaaaaa odpsospoaioaoaoaoaoao";
// 找字符串里面的最长的单词和单词的长度
let arr = str.split(' ');
let maxLength = 0;
let maxIndex = 0;
arr.forEach((value, index) => {
    if (value.length > maxLength) {
        maxLength = value.length;
        maxIndex = index;
    };
});

console.log(`最长单词是${arr[maxIndex]},单词长度为${maxLength}`);