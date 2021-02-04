# 1.请连接任意数据库(命令行或客户端)

# 2.请写出该连接下能显示的所有数据库(显示数据库)

# 3.请创建一个db_你的姓名 的数据库(例如_XiaoEn)

# 4.请选择使用该数据库

# 5.在该数据库下导入如下表及数据

-- employees.sql

# 6.请问db_XiaoEn这个数据库下有几张表?

show tables;

# 7.请解释一下 表employees的字段及结构

desc employees;

# 8.请说明一下表 employees的主键及字段的列属性

show create table employees;

# 9.请创建一张表,名为user, 字段为: id,数据类型为int类型，主键，自动增长;name,数据类型为 varchar(20),不能为空,默认值为空字符串;
                               年龄,数据类型为tinyint, 无符号 不能为空， 默认值为18
# 10.请给创建好的表user添加一个字段，email，数据类型为varchar(20)


# 11.请修改一下第10步创建好的字段email,让email这个字段不能为空

# 12.把修改完的email这个字段从数据表中删除

# 13.给user表的id添加主键

# 14.把给user表添加的主键 删除掉

# 15.请说明一下为什么user表中的年龄，要给数据类型为tinyint

# 16.请添加一个字段，生日 字段所设置要合情合理

# 17.往user表中插入5条数据数据

id 姓名 年龄  email      生日
1  张三  18   zs@qq.com 1998-06-09
2  里斯  19   ls@qq.com 1998-06-10
3  王武  21   ww@qq.com 1998-06-11
4  赵六  17   zl@qq.com 1998-06-09
5  小七  17   xq@qq.com 2000-11-09

# 18.把user表中姓名为赵六的生日改为 1999-06-15

# 20.把user表中邮箱为xq@qq.com的用户删除掉

# 21.查询年龄为17的用户的所有信息
# 22.查询员工表涉及到的所有部门编号
SELECT DISTINCT department_id FROM employees;
# 23.查询员工名和姓连接成一个字段，并显示为 姓名
SELECT CONCAT(last_name,first_name) AS 姓名 FROM employees;
# 24.查询工资>12000的员工信息
SELECT * FROM employees WHERE salary>12000;
# 25.查询部门编号不等于90号的员工名和部门编号
SELECT last_name, department_id FROM employees WHERE department_id!=90;
# 26.查询工资在10000到20000之间的员工名，工资和奖金
SELECT
last_name,
	salary,
	commission_pct
FROM
	employees
WHERE
	salary>=10000 AND salary<=20000;
# 27.查询部门编号不在90-110之间，或者工资高于15000的员工信息
SELECT
	*
FROM
	employees
WHERE
	department_id<90 OR department_id>110 OR salary>15000;

# 28.查询员工名中包含字符a的员工信息
SELECT
	*
FROM
	employees
WHERE
	last_name LIKE '%a%';
# 29.查询员工名中第3个字符为n，第五个字符为l的员工名和工资
SELECT
	last_name,
	salary
FROM
	employees
WHERE
	last_name LIKE '__n_l%';

# 30.查询员工名中第二个字符为_的员工名（转义字符）
SELECT
	last_name
FROM 
	employees
WHERE 	 
	last_name LIKE '_\_%';

# 31.查询员工编号在100到120之间的员工信息
SELECT
	*
FROM
	employees
WHERE
	employee_id BETWEEN 100 AND 120;

# 32.查询员工的工种编号是 IT_PROT, AD_VP, AD_PRES中的一个的员工名和工种编号
SELECT
	last_name,
	job_id
FROM
	employees
WHERE
	job_id IN ('IT_PROT' ,'AD_VP' , 'AD_VP');
  
# 33.查询没有奖金的员工名和奖金率
SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct IS NULL;

# 34.查询员工信息，要求工资从高到低排序
SELECT * FROM employees ORDER BY salary DESC;

# 35.查询部门编号>=90的员工信息，按入职时间的先后进行排序
SELECT *
FROM employees
WHERE department_id>=90
ORDER BY hiredate ASC;

# 36.姓名中首字符大写，其他字符小写，用_拼接，显示出来
SELECT CONCAT(UPPER(SUBSTR(last_name,1,1)),'_',LOWER(SUBSTR(last_name,2))) output
FROM employees;

# 37.查询员工的工资情况
/*
如果工资>20000,显示A级别
如果工资>15000,显示B级别
如果工资>10000,显示C级别
否则显示D级别
*/

SELECT salary,
CASE
WHEN salary>20000 THEN 'A'
WHEN salary>15000 THEN 'B'
WHEN salary>10000 THEN 'C'
ELSE 'D'
END AS 工资级别
FROM employees;

# 38.查询有奖金的每个领导手下员工的最高工资
SELECT MAX(salary),manager_id
FROM employees
WHERE commission_pct IS NOT NULL
GROUP BY manager_id;

# 39.查询哪个部门的员工个数大于2
#①查询每个部门的员工个数
SELECT COUNT(*),department_id
FROM employees
GROUP BY department_id;
#②根据1的结果进行筛选
SELECT COUNT(*),department_id
FROM employees
GROUP BY department_id
HAVING COUNT(*)>2;

# 40.查询领导编号>102的每个领导手下的最低工资>5000的领导编号
#①查询领导编号>102的每个领导手下的最低工资

SELECT MIN(salary),manager_id
FROM employees
WHERE manager_id>102
GROUP BY manager_id;

#②在1的基础上，最低工资>5000
SELECT MIN(salary),manager_id
FROM employees
WHERE manager_id>102
GROUP BY manager_id
HAVING MIN(salary)>5000;

# 41.查询每个部门每个工种的员工的平均工资,并将>10000的按高低排序
SELECT AVG(salary) a,department_id,job_id
FROM employees
GROUP BY department_id,job_id
HAVING a>10000
ORDER BY AVG(salary) DESC;

# 42.查询员工名和对应的部门名
SELECT last_name,department_name
FROM employees,departments
WHERE employees.department_id=departments.department_id;

# 43.查询出城市名中第二个字符为o的部门名和城市名
SELECT department_name,city
FROM departments d,locations l
WHERE d.`location_id`=l.`location_id`
AND city LIKE '_o%';

# 44.查询有奖金的每个部门的部门名和部门的领导编号，和该部门的最低工资
SELECT department_name,d.manager_id,MIN(salary)
FROM departments d,employees e
WHERE d.`department_id`=e.`department_id`
AND commission_pct IS NOT NULL
GROUP BY department_name;

# 45.查询员工名、部门名、工种名，并按部门名降序（三表连接）
SELECT last_name,department_name,job_title
FROM employees e
INNER JOIN departments d
ON e.`department_id`=d.`department_id`
INNER JOIN jobs j
ON e.`job_id`=j.`job_id`
ORDER BY department_name DESC;


# 46.#查询工资的个数>20的级别个数，并且按工资级别降序
SELECT COUNT(*),grade_level
FROM employees e
INNER JOIN job_grades g
ON e.`salary` BETWEEN g.`lowest_sal` AND g.`highest_sal`
GROUP BY grade_level
HAVING COUNT(*)>20
ORDER BY grade_level DESC;

# 47.查询部门名为SAL或IT的员工信息
SELECT e.*,d.department_name
FROM departments d
LEFT OUTER JOIN employees e
ON d.`department_id`=e.`department_id`
WHERE d.`department_name`IN ('SAL' , 'IT');

# 48.返回job_id与141号员工相同，salary比143号员工多的员工姓名，job_id和工资
SELECT last_name,job_id,salary
FROM employees
WHERE job_id=(
	SELECT job_id
	FROM employees
	WHERE employee_id=141
) AND salary>(
	SELECT salary
	FROM employees
	WHERE employee_id=143
);
# 49.返回其他工种中比job_id为IT_PROG部门所有工资低的员工信息

  SELECT employee_id,last_name,job_id,salary
  FROM employees
  WHERE salary<ALL(
	SELECT DISTINCT salary
	FROM employees 
	WHERE job_id='IT_PROG'
) AND job_id <> 'IT_PROG';

# 50.有奖金的员工信息，并且工资较高的前10名显示
SELECT * FROM employees 
WHERE commission_pct IS NOT NULL
ORDER BY salary DESC
LIMIT 10;