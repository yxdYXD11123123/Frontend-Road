CREATE DATABASE lil_practice;
# 创建用户信息表
CREATE TABLE users(
`uid` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
`uname` VARCHAR(10) NOT NULL,
`password` VARCHAR(20) NOT NULL,
`age` INT NOT NULL,
`email` VARCHAR(50) NOT NULL,
`hobbies` VARCHAR(30)
);
# 插入一条数据
INSERT INTO users (uname,`password`,age,email,hobbies) VALUES ('dong', '123456', 22, '3333@qq.com', '足球,篮球,橄榄球')