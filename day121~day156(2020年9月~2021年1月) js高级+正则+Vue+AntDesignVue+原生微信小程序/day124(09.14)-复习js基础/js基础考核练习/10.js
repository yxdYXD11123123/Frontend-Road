// 有一个二维数组，每条数据固定stuid表示学号,name表示姓名,gender表示性别
var students = [
    { stuid: "S01", name: "周夏", gender: "男", score: 86 },
    { stuid: "S02", name: "郑竹", gender: "男", score: 77 },
    { stuid: "S03", name: "吴兰", gender: "女", score: 35 },
    { stuid: "S04", name: "李云", gender: "男", score: 56 }
];
// 定义函数getMaxScore,
// 要求:接收学生信息二维数组students,函数中找出成绩最高和最低的学生姓名，并将结果返回

function getMaxScore(students) {
    let minScore = students[0].score;
    let minIndex = 0;
    let maxScore = students[0].score;
    let maxIndex = 0;
    students.forEach((value, index) => {
        if (value.score > maxScore) {
            maxIndex = index;
        }
        if (value.score < minScore) {
            minIndex = index;
        }
    });
    return `最高成绩同学姓名为${students[maxIndex].name}
    最低成绩同学姓名为${students[minIndex].name}
    `
}

console.log(getMaxScore(students));;