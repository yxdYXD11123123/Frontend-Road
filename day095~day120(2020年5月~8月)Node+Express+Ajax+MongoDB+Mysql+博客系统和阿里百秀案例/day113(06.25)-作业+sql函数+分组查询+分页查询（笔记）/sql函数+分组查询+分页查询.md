# 函数

#### 概念：

在`mysql`中，没有方法，只有函数，将一系列逻辑封装在一个函数体中，对外暴露方法名

#### 优点：

1. 隐藏了实现细节
2. 提高了代码的复用性

#### 特点：

1. 函数的功能是什么
2. 函数的参数是什么
3. 有无返回值，如果有返回值，返回值是什么（在`mysql`中一般都有返回值）

#### 分类：

有以下几种，还有流程控制函数等



## 字符函数

有` length()、concat()、substr()、instr()、trim()、upper()、lower()、lpad()、rpad()、replace()`

#### `length()`

```sql
SELECT LENGTH('我');
// 3 在mysql中，每一个中文的字符长度为3
```

#### `concat()`

```sql
SELECT CONCAT('拼','接') AS '拼接结果';
```

#### `substr()`

参数：（字符串，从哪个地方开始取）

注意：索引从 <font color=red>**1**</font> 开始

```sql
SELECT SUBSTR('一二三',3);
// 三
```

#### `trim()`

```sql
SELECT TRIM('  去除两端空格   ');
// 可以指定字符去除 
SELECT TRIM('b' FROM 'bb去除两端bbb');
```

#### `lower() / upper()`

```sql
SELECT UPPER('Hello');
SELECT LOWER('Hello');
```

#### `instr()`

返回某一个字符串的子串的索引，如果没有，返回0

```sql
SELECT INSTR('失去中成长','成长')
// 4
```

#### `lpad() \ rpad()` 左填充 右填充 

参数：（原始字符串，填充完总共需要多少位，填充字符）

````sql
SELECT LPAD('左填充',5,'*')
// **左填充
SELECT RPAD('右填充',5,'*')
// 右填充**
````

#### `replace()`

参数：（原始字符串，要被替换掉的字符，要替换上去的字符）

```sql
SELECT REPLACE('我最喜欢吃菜','菜','肉');
-- 我最喜欢吃肉
```



## 数学函数

有`round()、ceil()、floor()、truncate()、mod()`

#### `round()` 四舍五入

参数：（数字，小数点后保留几位）

```sql
SELECT ROUND(1.1453, 2);
-- 1.15
```

#### `ceil()`

```sql
SELECT CEIL(-1.01);
-- -1
SELECT CEIL(1.01);
--  2
```

#### `floor()`

```sql
SELECT FLOOR(-8.03);
-- -9
SELECT FLOOR(8.03);
--  8
```

#### `truncate()` 截断

参数：（数字，保留几位小数）

```sql
SELECT TRUNCATE(8.03,1);
-- 8.0
```

#### `mod()` 取余

```sql
SELECT MOD(10,3);
-- 1
```



## 日期函数

有`now()、curdate()、curtime()、year()、month()`

#### 返回 `mysql` 所在的电脑的当前日期+时间

```sql
SELECT NOW();
```

#### 返回当前系统的日期

```sql
SELECT CURDATE();
```

#### 返回当前系统的时间

```sql
SELECT CURTIME();
```

#### 返回指定的年

```sql
SELECT YEAR(NOW()) AS '年';
```

#### 返回指定的月

```sql
SELECT MONTH(NOW()) AS '月';
```

#### 返回指定的天

```sql
SELECT DAY(NOW()) AS '日';
```

#### 返回xx年xx月xx日

```sql
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日';
-- 2020年06月24日
```



## 流程控制函数(if)

参数：（条件表达式，表达式为true时执行，表达式为false时执行）

```sql
SELECT IF(9>5,'是','否') AS '三元运算符';
```



## 聚合函数

#### 概念：

对一组值执行计算（在忽略空值的情况下，除了count(*)以外），并返回单个值

所以，只要使用了聚合函数，相当于从多行中聚合出一行，而且列中的<font color=red>`* 以及 原始的字段名`</font>默认为多行中的第一行数据的字段信息

#### 功能：

主要是做统计，又称为分组函数或者是统计函数

#### 内容：

`sum()求和函数  avg()求平均值函数  max()最大值  min()最小值  count()计数`

#### 特点：

1. 聚合函数都是忽略null值
2. 可以和distinct配合使用去重
3. 和分组查询 group by
4. sum和avg只能用于处理数值类型的数据

#### `sum()` 

```sql
// 求 math（数学成绩） 字段 的总和
SELECT SUM(math) FROM student;
```

#### `avg()`

```sql
// 求 数学平均成绩
SELECT AVG(math) FROM student;
```

#### `max() \ min()`

```sql
-- 求最高\最低数学成绩
SELECT MAX(math),MIN(math) FROM student;
```

#### `count()`

`count(*)` 返回表中的所有记录数

`count(column_name)` 返回指定列的值的数目（null不计入其中）

```sql
-- 统计学生中数学成绩大于90的总人数
SELECT COUNT(*) FROM student WHERE math > 90;
```



## 分组查询

#### 语法：

select 聚合函数，列（要求必须出现在 group by 后面）

from 表

[where 筛选条件]  <font color=red>where其实是在筛选实表，所以不可以使用别名</font>

group by 分组列表

[having 筛选条件] <font color=red>having其实是在筛选虚表，所以可以使用别名</font>

[order by 排序列表 [`desc`]]

#### 注意： 

1. 查询列表必须特殊，要求是分组函数和 group by 函数出现的字段
2. 能用where筛选绝不用having（where效率要比having效率高）
3. 

#### 特点：

1. 分组查询中的筛选条件分为两类（筛选的情况不同：分组前筛选、分组后筛选）
   * 分组前筛选：原始表 where筛选 group by 
   * 分组后筛选：分组后的结果集 group by having 选择分组
2. group by 子句支持单个字段分组，也可以多个字段分组
3. 需要排序的话就放在group by 后面进行排序就可以了

### 案例

```sql
-- 按性别分组查询各组的最大年龄
SELECT MAX(age),ssex FROM student GROUP BY gender;

-- 如果前面不做聚合处理，默认为每个组中选出第一个
SELECT *,role_main FROM heros GROUP BY role_main;

-- 先分组，后筛选
-- 按照名字长度分组，查询到各组平均数学成绩，筛选出名字长度为6的分组
SELECT AVG(math),LENGTH(NAME) AS 名字长度 FROM student GROUP BY 名字长度 HAVING 名字长度 = 6;
-- 注意：having的使用前提是having中的条件只能使用分组结果得出的字段

-- 查询名字为两个字的英雄的平均血量（hp_max）
-- 方案一：  直接筛选用聚合
SELECT AVG(hp_max),LENGTH(NAME) AS 名字长度 FROM heros WHERE LENGTH(NAME) = 6;
-- 方案二：  先分组后筛选
SELECT AVG(hp_max),LENGTH(NAME) AS 名字长度 FROM heros GROUP BY LENGTH(NAME) HAVING 名字长度 = 6;
SELECT AVG(hp_max),LENGTH(NAME) FROM heros GROUP BY LENGTH(NAME) HAVING `LENGTH(name)` = 6;
-- 注意：
-- having的使用时，后面只能筛选分组得到的虚表中的列名（可能是一个 别名），或者是聚合函数， 
-- 所以，如果列名中有 类似length函数包裹静态字段的，最好起一个别名来用，或者将length函数连带静态字段用反引号包裹起来，视作一个名字字符串，再或者select出 * 就可以仍然使用以前的字段名
```

查询英雄信息练习

```sql
-- 1 查询近战远战attack_range中开始攻击力(attack_start)最高的
SELECT MAX(attack_start) AS 开始攻击力,attack_range FROM heros GROUP BY attack_range;

-- 2 查询各职业(role_main)的英雄数量
SELECT COUNT(*),role_main AS 职业 FROM heros GROUP BY 职业;

-- 3 查询名字（name）为两个字的英雄的平均血量(hp_max)
SELECT AVG(hp_max),LENGTH(NAME) AS 名字长度 FROM heros WHERE LENGTH(NAME) = 6;
SELECT AVG(hp_max) AS 平均血量,LENGTH(NAME)  FROM heros GROUP BY LENGTH(NAME) HAVING `LENGTH(name)` = 6;

-- 4 查询有生日的英雄的最高攻击力
SELECT MAX(attack_max) FROM heros WHERE NOT ISNULL(birthdate);
SELECT MAX(attack_max) FROM heros WHERE NOT (birthdate IS NULL);
SELECT MAX(attack_max),ISNULL(birthdate) AS 有无生日 FROM heros GROUP BY ISNULL(birthdate) HAVING 有无生日 = 0;

-- 5 查询那种职业的英雄数量大于8
SELECT COUNT(*),role_main FROM heros GROUP BY role_main HAVING COUNT(*)>8;

-- 6 查询大于平均血量的英雄信息
SELECT * FROM heros WHERE hp_max > (SELECT AVG(hp_max) FROM heros);
```

### `sql` 执行顺序

**执行顺序**：from... where...group by... having.... select ... order by... limit

1. from子句
2. where 子句
3. group by （把前面找出来的数据根据分组字段进行分组）
4. having （把分组后的数据，进一步筛选）
5. select （显示出来）
6. order by （排序）

## 分页查询

### 应用场景：

如果数据量特别大，当要显示的数据一页显示不全的时候，就需要分页

### 语法：

select 聚合函数，列（要求必须出现在 group by 后面）

from 表

[where 筛选条件]  <font color=red>where其实是在筛选实表，所以不可以使用别名</font>

group by 分组列表

[having 筛选条件] <font color=red>having其实是在筛选虚表，所以可以使用别名</font>

[order by 排序列表 [`desc`]]

limit offset（从第几条开始）, size（查询几条）

### 特点：

1. limit子句要放在所有子句的后面
2. 公式：limit (page-1)*size, size

```sql
-- 查询 第11条 -- 第25条
SELECT * FROM employees LIMIT 10,15;
-- 查询有奖金的员工信息，并且显示工资较高的前十名
SELECT * FROM employees WHERE commission_pct IS NOT NULL ORDER BY salary DESC LIMIT 0,10;
```


