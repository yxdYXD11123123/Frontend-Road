# 1.请连接任意数据库(命令行或客户端)
mysql -uroot -proot;

# 2.请写出该连接下能显示的所有数据库(显示数据库)
SHOW DATABASES;

# 3.请创建一个db_你的姓名的数据库(例如_XiaoEn)
CREATE DATABASE db_gcd CHARSET utf8;

# 4.请选择使用该数据库
USE db_gcd;

# 5.请创建一张表,名为student, 字段为: sno,数据类型为varchar(20)类型,不为空，注释为学号;
--                                    sname,数据类型为 varchar(20),设置为主键,不能为空,默认值为空字符串，注释为姓名;
--                                    ssex,数据类型varchar(20)，不为空，注释为性别;
--                                    sbirthday,数据类型datetime,默认值是"2020-01-01",注释是生日;
--                                    class,数据类型为varchar(20),注释是班级
CREATE TABLE student(
	sno VARCHAR(20) NOT NULL COMMENT '学号',
	sname VARCHAR(20) NOT NULL PRIMARY KEY DEFAULT '' COMMENT '姓名',
	ssex VARCHAR(20) NOT NULL COMMENT '性别',
	sbirthday DATETIME DEFAULT '2020-01-01' COMMENT '生日',
	class VARCHAR(20) COMMENT '班级'
)


# 6.请给创建好的表student添加一个字段，email，数据类型为varchar(20)
ALTER TABLE student ADD email VARCHAR(20);

# 7.请修改一下第10步创建好的字段email,让email这个字段不能为空
ALTER TABLE student MODIFY email VARCHAR(20) NOT NULL;

# 8.把修改完的email这个字段从数据表中删除
ALTER TABLE student DROP email;

# 9.将student表的主键更改为sno
ALTER TABLE student DROP PRIMARY KEY;
ALTER TABLE student ADD PRIMARY KEY(sno);
-- desc student;

# 10.往student表中插入7条数据数据

 sno   sname  ssex   sbirthday   class   
'108' '曾华' '男' '1977-09-01' '95033'  
'105' '匡明' '男' '1975-10-02' '95031' 
'107' '王丽' '女' '1976-01-23' '95033' 
'101' '李军' '男' '1976-02-20' '95033' 
'109' '王芳' '女' '1975-02-10' '95031' 
'103' '陆君' '男' '1974-06-03' '95031' 
'110' '贾拉' '女' '2020-02-03' '95032'
INSERT INTO student VALUES('108','曾华','男','1977-09-01','95033');
INSERT INTO student VALUES('105','匡明','男','1975-10-02','95031');
INSERT INTO student VALUES('107','王丽','女','1976-01-23','95033');
INSERT INTO student VALUES('101','李军','男','1976-02-20','95033');
INSERT INTO student VALUES('109','王芳','女','1975-02-10','95031');
INSERT INTO student VALUES('103','陆君','男','1974-06-03','95031');
INSERT INTO student VALUES('110','贾拉','女','2020-02-03','95032');

# 11.在该数据库下导入如下表及数据
-- [已运行 teacher.sql]

-- teacher.sql

# 12.请问db_XiaoEn这个数据库下有几张表?
SHOW TABLES; -- 4张

# 13.请解释一下teacher表的字段及结构
-- tno varchar(20) not null primary key, 老师id 字符类型长度20 不能为空 [主键]
-- tname varchar(20) not null, 姓名 字符类型长度20 不能为空
-- tsex varchar(20) not null, 性别 字符类型长度20 不能为空
-- tbirthday datetime, 出生日期 日期类型
-- prof varchar(20), 职位 字符类型长度20
-- depart varchar(20), not null 教授课程 字符类型长度20 不能为空

# 14.请说明一下表 teacher的主键是哪个字段，以及对这个字段的约束有哪些
-- 主键是tno字段 约束有字符类型最大长度为20且不能为空


# 15.把student表中姓名为的王芳生日改为 1999-06-15,性别改为"男"
UPDATE student SET sbirthday='1999-06-15',ssex='男' WHERE sname='王芳';

# 16.把student表中的学生姓名是"贾拉"的这条数据删除掉
DELETE FROM student WHERE sname='贾拉';

# 17.查询Student表中的所有的信息。
SELECT * FROM student;
 
# 18.查询Student表中sname、ssex和class列的所有信息
SELECT sname,ssex,class FROM student;
   
# 19.查询教师表中depart列的所有信息并去除重复值
SELECT DISTINCT depart FROM teacher;
  
# 20.查询Score表中成绩在60到80之间的所有信息
SELECT * FROM score WHERE degree BETWEEN 60 AND 80;
SELECT * FROM score WHERE degree>=60 AND degree<=80;
  
# 21.查询Score表中成绩为85，86或88的所有信息
SELECT * FROM score WHERE degree IN(85,86,88);
  
# 22.查询成绩存在有85分以上（不含85分）的课程的cno列信息，并对课程cno去重. 
SELECT DISTINCT cno FROM score WHERE degree>85;
    
# 23.查询“计算机系”与“电子工程系“所有教师的tname和prof列信息
SELECT tname,prof FROM teacher;
   
# 24.查询Student表中班级为“95031”班或性别为“男”的所有学生的信息
SELECT * FROM student WHERE class='95031' OR ssex='男';

# 25.查询Teacher表中所在系别是”电子工程系”并且职位是“讲师”的老师的信息
SELECT * FROM teacher WHERE depart='电子工程系' AND prof='讲师';
  
# 26.查询Score表中学号是103所选的课程，并按照降序的方式排序
SELECT * FROM score WHERE sno=103 ORDER BY degree DESC;
     
# 27.查询Score表的所有信息,查询结果按照cno升序、degree降序排列
SELECT * FROM score ORDER BY cno ASC,degree DESC;

# 28.查询Student表中的所有信息，查询结果按照年龄从大到小排列
SELECT * FROM student ORDER BY sbirthday ASC;
     
# 29.查询“95031”班的学生人数
SELECT COUNT(*) FROM student WHERE class=95031;

# 30.查询Student表中不姓"王"的同学记录
SELECT * FROM student WHERE sname NOT LIKE '王%';
SELECT * FROM student WHERE LEFT(sname,1) != '王';
SELECT * FROM student WHERE SUBSTR(sname,1,1) != '王';

# 31.查询Student表中名字中包含"王"字的同学记录
SELECT * FROM student WHERE sname LIKE '%王%';
 
# 32.查询Student表中姓"王",但是单名的同学的记录
SELECT * FROM student WHERE sname LIKE '王_';

# 33.查询Student表中最大和最小的Sbirthday日期值
SELECT MAX(sbirthday),MIN(sbirthday) FROM student;

# 34. 查询Student表中的所有学生的年龄
SELECT sname '姓名',(YEAR(NOW())-YEAR(sbirthday)) '年龄' FROM student;

# 35.查询每门课程的平均成绩
SELECT cno,AVG(degree) FROM score GROUP BY cno; 

# 36.查询Student表中男、女各有多少人
SELECT ssex,COUNT(*) 人数 FROM student GROUP BY ssex;

# 37.查询每个学生的每门课的总分以及平均分
SELECT sno,cno,SUM(degree),AVG(degree) FROM score GROUP BY sno,cno;

# 38.查询Score表中每门课程的平均分数（要求查询的课程至少要有3个成绩）。
SELECT cno,AVG(degree) FROM score GROUP BY cno HAVING COUNT(sno)>=3;

# 39.查询Score表中的最高分的学生学号和课程号
SELECT sno,cno FROM score WHERE degree=(SELECT MAX(degree) FROM score);

# 40.在Teacher表中查询年龄最大的老师的信息
SELECT * FROM teacher WHERE tbirthday=(SELECT MIN(tbirthday) FROM teacher);
-- 或者
SELECT * FROM teacher ORDER BY tbirthday LIMIT 1;

# 41.查询学生”王芳”选修的课程号有哪些
SELECT DISTINCT cno FROM score WHERE sno=(SELECT sno FROM student WHERE sname='王芳');
-- 或者
SELECT cno FROM score AS sc
JOIN student AS st
ON sc.sno = st.sno
WHERE sname = '王芳'
 
# 42.查询成绩表前面3条数据
SELECT * FROM score LIMIT 0,3;
-- 或者
SELECT * FROM score LIMIT 3;
 
# 43.查询成绩表第二页的数据，每页显示三条数据
SELECT * FROM score LIMIT 3,3;

# 44.查询“男”教师的名称及其所上的课程的名称
SELECT tname,cname FROM teacher AS t
JOIN course AS c
ON t.tno = c.tno
WHERE tsex = '男';
 
# 45.查询学生”陆君”所选每门课的平均分

-- 或者
SELECT cno,AVG(degree) FROM student
JOIN score
ON student.sno = score.sno
WHERE sname = '陆君'
GROUP BY cno;

# 46.查询选了课程编号为3-245且课程成绩在70分以上的学生的学号和姓名
SELECT sc.sno,sname FROM score sc JOIN student st ON sc.sno=st.sno WHERE cno='3-245' AND degree>70;

# 47.查询平均成绩大于70 的所有学生的学号、姓名和平均成绩
SELECT sc.sno,sname,AVG(degree) FROM score sc JOIN student st ON sc.sno=st.sno GROUP BY sc.sno HAVING AVG(degree)>70;

# 48.查询所有学生的选课情况(学生姓名和课程名和老师名)
SELECT sname,cname,tname FROM student st,score sc,course c,teacher t WHERE st.sno=sc.sno AND sc.cno=c.cno AND c.tno=t.tno;
SELECT sname,cname,tname FROM student st JOIN score sc JOIN course c JOIN teacher t ON st.sno=sc.sno AND sc.cno=c.cno AND c.tno=t.tno;

# 49.查询选修"计算机导论"课程的学生的姓名和学号以及成绩
SELECT sname,st.sno,degree FROM score sc JOIN course c JOIN student st ON sc.cno=c.cno AND st.sno=sc.sno WHERE cname='计算机导论';

# 50.查询选修没有学生的老师的所有信息
-- 子查询方式
SELECT t.* FROM teacher t WHERE tno=(SELECT c.tno FROM course c WHERE NOT EXISTS (SELECT * FROM score s WHERE c.cno=s.cno))
SELECT t.* FROM teacher t WHERE tno=(SELECT c.tno FROM course c WHERE cno NOT IN (SELECT DISTINCT cno FROM score))
-- 外连接方式
SELECT t.* FROM score AS sc
JOIN student AS st JOIN course AS c RIGHT JOIN teacher AS t
ON sc.sno = st.sno AND sc.cno = c.cno AND c.tno = t.tno
WHERE sc.sno IS NULL;






