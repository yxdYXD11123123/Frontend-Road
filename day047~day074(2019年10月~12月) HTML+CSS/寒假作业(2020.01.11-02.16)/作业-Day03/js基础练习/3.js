let obj = {
    name: "柠檬",
    age: 17
}
console.log(obj.name);
obj.age = "未成年"
obj.gender = '女'
obj["hobby"] = "画画"
obj.career = "学生"
console.log(obj);
delete obj.name;
console.log(obj);
