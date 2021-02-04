CREATE DATABASE aLiBaiXiu;
USE aLiBaiXiu;
-- 用户表 users
CREATE TABLE users(
id INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
email VARCHAR(200) NOT NULL COMMENT '邮箱',
`password` VARCHAR(200) NOT NULL COMMENT '密码',
nickname VARCHAR(100) DEFAULT NULL COMMENT '昵称',
slug VARCHAR(200) NOT NULL COMMENT '别名',
avatar VARCHAR(200) DEFAULT NULL COMMENT '头像',
`status` VARCHAR(20) NOT NULL COMMENT '状态（未激活unactivated、已激活activated、无权限forbidden、禁用trashed）',
bio VARCHAR(250) DEFAULT '这个人很懒，什么都没写' COMMENT '个人简介'
)CHARSET = utf8mb4;
DESC users;
DROP TABLE tablename1;

-- 文章表 posts
CREATE TABLE posts (
id INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
slug VARCHAR(200) NOT NULL COMMENT '别名',
title VARCHAR(200) NOT NULL COMMENT '文章标题',
feature VARCHAR(200) DEFAULT NULL COMMENT '文章特色图像',
created DATETIME NOT NULL COMMENT '发表时间',
content TEXT COMMENT '内容',
views INT(10) COMMENT '浏览量',
likes INT(10) COMMENT '点赞量',
`status` VARCHAR(20) NOT NULL COMMENT '草稿，已发布，回收站',
`user_id` INT(11) NOT NULL COMMENT '用户id',
category_id INT(11) NOT NULL COMMENT '分类id'
)CHARSET = utf8mb4;

-- 分类表
CREATE TABLE categories (
id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
slug VARCHAR(200) NOT NULL COMMENT '别名',
`name` VARCHAR(200) NOT NULL COMMENT '分类'
)CHARSET = utf8mb4;

-- 评论表
CREATE TABLE comments (
id INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
author VARCHAR(200) NOT NULL COMMENT '用户id',
email VARCHAR(200) NOT NULL COMMENT '邮箱',
created DATETIME NOT NULL COMMENT '发布时间',
content TEXT COMMENT '内容',
`status` VARCHAR(20) NOT NULL COMMENT '待审核held、准许approved、拒绝rejected、回收站trash',
post_id INT(11) NOT NULL COMMENT '文章id',
parent_id INT(11) NOT NULL COMMENT '父级id'
)CHARSET = utf8mb4;

-- options 表（json格式）
CREATE TABLE OPTIONS (
id INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
`key` VARCHAR(200) NOT NULL COMMENT '属性键',
`value` TEXT NOT NULL COMMENT '属性值'
);












