-- 查询每个职位的最高工资
SELECT MAX(salary),job_id FROM employees GROUP BY job_id;
-- 查询每个地区的部门个数
SELECT COUNT(department_id),location_id FROM departments GROUP BY location_id;
-- 查询邮箱中包含o字符的，每个部门的平均工资
SELECT AVG(salary),department_id FROM employees WHERE email LIKE '%o%' GROUP BY department_id;
-- 查询有奖金的员工里，每个领导手下的员工的最高工资
SELECT MAX(salary),manager_id FROM employees WHERE commission_pct IS NOT NULL GROUP BY manager_id;
-- 查询哪个部分的员工人数大于2
SELECT COUNT(*) AS 人数,department_id AS 部门 
FROM employees GROUP BY department_id 
HAVING 人数 > 2;
-- 查询 领导编号>102的，每个领导属下的最低工资>5000的领导编号
SELECT MIN(salary)AS 最低工资,manager_id AS 领导编号 
FROM employees WHERE manager_id >102 
GROUP BY manager_id HAVING 最低工资 > 5000;
-- 按员工姓名的长度进行分组，查询每组员工个数，筛选员工个数大于5的
SELECT COUNT(last_name),LENGTH(last_name) FROM employees GROUP BY LENGTH(last_name) HAVING COUNT(last_name) >5;
-- 查询每个部门每个职位的平均工资
SELECT AVG(salary),department_id,job_id FROM employees GROUP BY department_id,job_id;
-- 查询每个部门每种职位员工的平均薪资，并将大于8000的薪资按照降序排列
SELECT AVG(salary),department_id,job_id FROM employees 
GROUP BY department_id,job_id HAVING AVG(salary)>8000
ORDER BY AVG(salary) DESC;


-- 分页查询
-- 查询 第11条 -- 第25条
SELECT * FROM employees LIMIT 10,15;
-- 查询有奖金的员工信息，并且显示工资较高的前十名
SELECT * FROM employees WHERE commission_pct IS NOT NULL ORDER BY salary DESC LIMIT 0,10;







