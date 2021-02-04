# 1.请连接任意数据库(命令行或客户端)
# 用户名root 密码root
# 命令行：mysql -hlocalhost -P3306 -uroot -proot

# 2.请写出该连接下能显示的所有数据库(显示数据库)
SHOW DATABASES;

# 3.请创建一个db_你的姓名 的数据库(例如_XiaoEn)
CREATE DATABASE db_yuanxudong;

# 4.请选择使用该数据库
USE db_yuanxudong;

# 5.在该数据库下导入如下表及数据

-- employees.sql

# 6.请问db_XiaoEn这个数据库下有几张表?
SHOW TABLES;
-- 五张表

# 7.请解释一下 表employees的字段及结构 (依次描述每个字段的意思和数据类型)
DESC employees;
-- employee_id 员工号 数字int类型(显示长度为6)
-- 


# 8.请说明一下表 employees的主键是哪个字段及此字段的列属性有哪些约束
SHOW CREATE TABLE employees;
-- 主键为：employee_id
-- null 为 no，也就是不能为null值，并且是auto_increment自动增长，并且为 PRIMARY KEY主键



# 9.请创建一张表,名为users, 
-- 字段为: id,数据类型为int类型，设为主键;
-- name,数据类型为 varchar(20),不能为空,默认值为空字符串;
-- 年龄,数据类型为tinyint, 无符号 不能为空， 默认值为18
CREATE TABLE users(
id INT PRIMARY KEY,
`name` VARCHAR(20) NOT NULL DEFAULT '',
age TINYINT UNSIGNED NOT NULL DEFAULT 18
);
DROP TABLE users;

# 10.请给创建好的表users添加一个字段，email，数据类型为varchar(20)
ALTER TABLE users ADD email VARCHAR(20);


# 11.请修改一下第10步创建好的字段email,让email这个字段不能为空
ALTER TABLE users MODIFY email VARCHAR(20) NOT NULL;

# 12.把修改完的email这个字段从数据表中删除，（删除后按照11题的要求再次创建出来）
ALTER TABLE users DROP email;
ALTER TABLE users ADD email VARCHAR(20) NOT NULL;
DESC users;

# 13.把users表添加的主键 删除掉
ALTER TABLE users DROP PRIMARY KEY;

# 14.给id字段设置为主键且自动增长（设置主键和设置自动增长分为两步实现）
ALTER TABLE users ADD PRIMARY KEY(id);
ALTER TABLE users MODIFY id INT AUTO_INCREMENT;

# 15.请说明一下为什么users表中的年龄，要给数据类型为tinyint
-- 因为users表中的年龄不会超出tinyint的范围，tinyint不加符号的范围在0-255

# 16.请添加一个字段，生日 字段所设置要合情合理
ALTER TABLE users ADD birthday DATE;

# 17.往users表中插入5条数据数据
-- id 姓名 年龄  email      生日
-- 1  张三  18   zs@qq.com 1998-06-09
-- 2  里斯  19   ls@qq.com 1998-06-10
-- 3  王武  21   ww@qq.com 1998-06-11
-- 4  赵六  17   zl@qq.com 1998-06-09
-- 5  小七  17   xq@qq.com 2000-11-09
INSERT INTO users (id,NAME,age,email,birthday) VALUES (1,'张三',18,'zs@qq.com', '1998-06-09');
INSERT INTO users (id,NAME,age,email,birthday) VALUES (2,'里斯',19,'ls@qq.com', '1998-06-10');
INSERT INTO users (id,NAME,age,email,birthday) VALUES (3,'王武',21,'ww@qq.com', '1998-06-11');
INSERT INTO users (id,NAME,age,email,birthday) VALUES (4,'赵六',17,'zl@qq.com', '1998-06-09');
INSERT INTO users (id,NAME,age,email,birthday) VALUES (5,'小七',17,'xq@qq.com', '2000-11-09');

# 18.把users表中姓名为赵六的生日改为 1999-06-15
UPDATE users SET birthday = '1999-06-15' WHERE NAME = '赵六';

# 20.把users表中邮箱为xq@qq.com的用户删除掉
DELETE FROM users WHERE email = 'xq@qq.com';

# 21.查询年龄为17的用户的所有信息
SELECT * FROM users WHERE age = 17;

# 22.查询员工表涉及到的所有部门编号（去重并且不要null）
SELECT DISTINCT department_id FROM employees WHERE department_id IS NOT NULL;

# 23.查询员工名和姓连接成一个字段，并显示为 姓名
SELECT CONCAT(first_name,last_name) AS 姓名 FROM employees;

# 24.查询工资>12000的员工信息
SELECT * FROM employees WHERE salary > 12000;

# 25.查询部门编号不等于90号的员工名(first_name)和部门编号
SELECT first_name,department_id FROM employees WHERE department_id <> 90;

# 26.查询工资在10000到20000之间的员工名，工资和奖金
SELECT first_name,salary,commission_pct FROM employees
WHERE salary BETWEEN 10000 AND 20000;

# 27.查询部门编号不在90-110之间，或者工资高于15000的员工信息
SELECT * FROM employees
WHERE department_id NOT BETWEEN 90 AND 110
OR salary > 15000;

# 28.查询员工名(first_name)中包含字符a的员工信息
SELECT * FROM employees
WHERE first_name LIKE '%a%';

# 29.查询员工名(first_name)中第3个字符为n，第五个字符为l的员工名和工资
SELECT first_name,salary FROM employees
WHERE first_name LIKE '__n_l%';

# 30.查询员工名（last_name）中第二个字符为_的员工名（转义字符）
SELECT last_name,salary FROM employees
WHERE last_name LIKE '_\_%';

# 31.查询员工编号在100到120之间的员工信息
SELECT * FROM employees
WHERE employee_id BETWEEN 100 AND 120;

# 32.查询员工的工种编号是 IT_PROT, AD_VP, AD_PRES的员工名和工种编号
SELECT first_name,job_id FROM employees
WHERE job_id IN ('IT_PROT', 'AD_VP', 'AD_PRES');
  
# 33.查询有奖金的员工名和奖金率
SELECT first_name,commission_pct FROM employees WHERE commission_pct IS NOT NULL;

# 34.查询员工信息，要求工资从高到低排序
SELECT * FROM employees
ORDER BY salary DESC;

# 35.查询部门编号>=90的员工信息，按入职时间的先后进行排序
SELECT * FROM employees
WHERE department_id >= 90 
ORDER BY hiredate;

# 36.姓名中首字符大写，其他字符小写，用_拼接，显示出来
SELECT CONCAT(UPPER(SUBSTR(first_name,1,1)),'_',LOWER(SUBSTR(first_name,2))) 
FROM employees;

# 37.查询员工的工资情况
/*
如果工资>20000,显示A级别
如果工资>15000,显示B级别
如果工资>10000,显示C级别
否则显示D级别
*/
SELECT *,IF(salary>10000,IF(salary>15000,IF(salary>20000,'A','B'),'C'),'D') AS 工资级别
FROM employees;


# 38.查询有奖金的每个领导手下员工的最高工资
SELECT MAX(salary),manager_id FROM employees 
GROUP BY manager_id
HAVING manager_id IN (
SELECT employee_id FROM employees
WHERE employee_id IN (
SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL
)
AND commission_pct IS NOT NULL
);

# 39.查询哪个部门的员工个数大于2
#①查询每个部门的员工个数
SELECT COUNT(employee_id),department_id 
FROM employees 
GROUP BY department_id;
#②根据1的结果进行筛选
SELECT COUNT(employee_id),department_id 
FROM employees 
GROUP BY department_id
HAVING COUNT(employee_id)>2;

# 40.查询领导编号>102的每个领导手下的最低工资>5000的领导编号
#①查询领导编号>102的每个领导手下的最低工资
SELECT MIN(salary),manager_id FROM employees 
GROUP BY manager_id
HAVING manager_id IN (SELECT DISTINCT manager_id 
FROM employees WHERE manager_id > 102);

#②在1的基础上，最低工资>5000
SELECT MIN(salary),manager_id FROM employees 
GROUP BY manager_id
HAVING manager_id IN (SELECT DISTINCT manager_id 
FROM employees WHERE manager_id > 102)
AND MIN(salary) > 5000;

# 41.查询每个部门每个工种的员工的平均工资 ，筛选出>10000的，从高到低排序
SELECT AVG(salary),department_id,job_id FROM employees
GROUP BY department_id,job_id
HAVING AVG(salary) > 10000
ORDER BY AVG(salary) DESC;

# 42.查询员工名和对应的部门名
SELECT first_name,department_name FROM employees AS e
JOIN departments AS d
ON e.department_id = d.department_id;


# 43.查询出城市名中第二个字符为o的部门名和城市名
SELECT department_name,city FROM locations AS l
JOIN departments AS d
ON l.location_id = d.location_id
WHERE city LIKE '_o%';


# 44.查询有奖金的每个部门的部门名和部门的领导编号，和该部门的最低工资
SELECT department_name,e.manager_id,MIN(salary) FROM employees AS e
JOIN departments AS d
ON e.department_id = d.department_id
WHERE commission_pct IS NOT NULL
GROUP BY d.department_id;

# 45.查询员工名、部门名、工种名(job_title)，并按部门名降序（三表连接）
SELECT first_name,department_name,job_title 
FROM employees AS e JOIN departments AS d JOIN jobs AS j
ON e.department_id = d.department_id
AND e.job_id = j.job_id
ORDER BY department_name DESC;


# 46.查询工资的个数>20的工资级别，并且按工资级别降序
SELECT * FROM employees AS e JOIN job_grades AS g
ON e.salary BETWEEN g.lowest_sal AND highest_sal
GROUP BY grade_level
HAVING COUNT(salary) > 20
ORDER BY grade_level DESC;


# 47.查询部门名为Sal或IT的员工信息
SELECT * FROM employees AS e JOIN departments AS d
ON e.department_id = d.department_id
WHERE department_name IN ('Sal','IT');

# 48.返回job_id与141号员工相同，salary比143号员工多的员工姓名，job_id和工资
SELECT first_name,job_id,salary FROM employees
WHERE job_id = (SELECT job_id FROM employees WHERE employee_id = 141)
AND salary > (SELECT salary FROM employees WHERE employee_id = 143);

# 49.返回其他工种中比job_id为IT_PROG工种所有工资低的员工信息
;
SELECT * FROM employees 
WHERE salary < (SELECT MIN(salary) FROM employees 
WHERE job_id = 'IT_PROG');

# 50.有奖金的员工信息，并且工资较高的前10名显示
SELECT * FROM employees
WHERE commission_pct IS NOT NULL
ORDER BY salary DESC
LIMIT 10;
