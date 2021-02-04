# ```MySQL```

## 为什么要学习```MySQL```

1. 因为99%的网站都需要数据库的支持（44%的网站在用`MySQL`数据库）
2. `MySQL`免费
3. ```SQL```语句可以用于操作大部分数据库

## 数据库概述

### 数据库的概念

数据库(Database)是按照<font color=red>数据结构来组织、存储和管理数据</font>的建立在计算机存储设备上的仓库。

数据库：存储数据的仓库

### 数据库分类

* #### 网路数据库

  网络数据库是指把数据库技术引入到计算机网络系统中，借助于网络技术将存储于数据库中的大量信息及时发布出去；而计算机网络借助于成熟的数据库技术对网络中的各种数据进行有效管理，并实现用户与网络中的数据库进行实时动态数据交互。

* #### 层级数据（类似`DOM树, json, xml, mongoDB(bson)`）

  层次结构模型实质上是一种有根结点的定向有序树(在数学中"树"被定义为一个无回的连通图)。

* #### 关系数据库

  是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。

  数据库的另外一种区分方式：<font color=red>基于存储介质</font>

  存储介质分为两种：磁盘和内存

  关系型数据库：存储在磁盘中

  非关系型数据库：存储在内存中



### 关系型数据库

**关系模型的组成：**关系数据结构、关系操作集合、关系完整性的约束

**关系数据结构：**指的数据以什么方式来存储，是一种二维表的形式存储，关系数据库是以表格（excel）的形式来存储数据的。

**关系操作集合(`SQL`语句)：**如何来关联和管理对应的存储数据，`SQL`指令

**关系完整性约束：**数据内部有对应的关联关系，以及数据与数据之间也有对应的关联关系

表内约束：对应的具体列只能放对应的数据（不能乱放）

表间约束：自然界各实体都是有着对应的关联关系（外键）

#### 典型关系型数据库

小型关系型数据库：`Microsft Access`、`SQLite(安卓用)`

中型关系型数据库：`SQL Server(微软 c# vs)`、`MySQL(肯定有免费版本 属于Oracle甲骨文)`

大型关系型数据库：`Oracle`、`DB2(IBM)` 主要用在银行

### `SQL`介绍

#### 基本介绍

结构化查询语言（Structured Query Language）简称`SQL`，是一种特殊目的的编程语言，是一种数据库查询和程序设计语言，是一种数据库查询和程序设计语言，用于存取数据以及查询、更新和管理关系数据库系统；同时也是数据库脚本文件的扩展名。

`SQL`就是专门为关系型数据库而设计的

#### `SQL`语句分类

数据查询语言（`DQL:Data Query Language`）：专门用于查询数据：代表指令为select/show

数据操作语言（`DML：Data Manipulation Language`）:专门用于写数据：代表指令为insert，update和delete

事务处理语言（`TP/cL`）：专门用于事务安全处理：transaction

数据控制语言（`DCL`）：专门用于权限管理：代表指令为grant和revoke

数据定义语言（`DDL`）：专门用于结构管理：代表指令create和drop（alter）

## `MySQL` 基本介绍

`MySQL`是一个关系型数据库管理系统，由瑞典`MySQL AB`公司开发，目前属于 `Oracl` 旗下产品。`MySQL` 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，`MySQL`是最好的 `RDBMS` (Relational Database Management System，关系数据库管理系统) 应用软件。

`MySQL`中用到的操作指令就是`SQL`指令



## 数据库的基本操作

### 启动和停止 `MySQL` 服务

`MySQL`是一种 C/S 结构： 客户端和服务端

服务端对应的软件：`MySQLd.exe`

```
// 启动停止
net start mysql55
net stop mysql55

// 检查版本
mysql --version
```

### 登录和退出 `MySQL` 系统

通过客户端与服务端进行连接认证，就可以进行操作

语法：

```
// 登录
mysql -h主机地址 -p端口 -u用户名 -p密码
mysql -hlocalhost -P3306 -uroot -proot
(第二种将密码分开输入的方式)
mysql -hlocalhost -uroot -p

// 退出
exit;
quit;
按键: ctrl+c
```

#### 创建数据库

```
// 创建 xxx 数据库 并且字符集选择utf8
mysql> create database 数据库名字 charset utf8;
```

#### 修改数据库

```
// 修改字符集
alter database 数据库名字 charset=字符集;
// 或者删除重新创建
```

#### 显示数据库

```
mysql> show databases;
```

####  删除数据库

```
mysql> drop database 数据库名字;
```

#### 选择即将操作的数据库

```
mysql> use 数据库名称
```

#### 显示要操作的数据库的所有表

```
mysql> show tables;
Empty set (0.00 sec)  // 表示里面是空的
```



## 数据表的操作

#### 创建表

```
// 在已选择database的情况下
mysql> create table class(
    -> name varchar(10)
    -> )charset utf8;
    
// 选择到哪个数据库中创建表   
数据库名字.表名  
(字段名 字段类型 [字段属性], 字段名 字段类型 [字段属性],…)
表选项中charset 为 uft8
mysql> create table db_pp.ppr(
    -> age varchar(10),
    -> gender varchar(1)
    -> )charset utf8;
```

#### 根据已有表结构复制创建

```
mysql> use db_practice
Database changed
mysql> create table copyppr like db_pp.ppr;
Query OK, 0 rows affected (0.01 sec)
```

#### 显示匹配表

```
mysql> show tables like 'c%'  // c 开头的
    -> ;
+----------------------------+
| Tables_in_db_practice (c%) |
+----------------------------+
| class                      |
| copyppr                    |
+----------------------------+


mysql> show tables like 'copyppr'  // 名字为copyppr的
    -> ;
+---------------------------------+
| Tables_in_db_practice (copyppr) |
+---------------------------------+
| copyppr                         |
+---------------------------------+
1 row in set (0.00 sec)
```

#### 显示表结构

```
// 三种方法
describe 表名
desc 表名
show columns from 表名

mysql> desc copyppr;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| age    | varchar(10) | YES  |     | NULL    |       |
| gender | varchar(1)  | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
2 rows in set (0.02 sec)

mysql> describe class;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| name  | varchar(10) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
1 row in set (0.01 sec)

mysql> show columns from copyppr;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| age    | varchar(10) | YES  |     | NULL    |       |
| gender | varchar(1)  | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
2 rows in set (0.01 sec)
```

![1592559540559](随堂笔记.assets/1592559540559.png)

#### 显示创建表时的语句

语法：show create table 表名;

```
mysql> show create table copyppr;
+---------+------------------------------------------------------------------------------------------------------------------------------------+
| Table   | Create Table                                                                                                                       |
+---------+------------------------------------------------------------------------------------------------------------------------------------+
| copyppr | CREATE TABLE `copyppr` (
  `age` varchar(10) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+---------+------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

使用\G结束语句;  \g的话和上面效果一样

```
mysql> show create table copyppr\G
*************************** 1. row ***************************
       Table: copyppr
Create Table: CREATE TABLE `copyppr` (
  `age` varchar(10) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
1 row in set (0.00 sec)
```

#### 设置表属性

基本语法：alter table 表名 <font color=red>表选项 [=] 值</font>;

```
mysql> alter table copyppr charset gbk\G
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show create table copyppr\G
*************************** 1. row ***************************
       Table: copyppr
Create Table: CREATE TABLE `copyppr` (
  `age` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `gender` varchar(1) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gbk
```

或者 加上 =

```
mysql> alter table copyppr charset = utf8;
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show create table copyppr\G
*************************** 1. row ***************************
       Table: copyppr
Create Table: CREATE TABLE `copyppr` (
  `age` varchar(10) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
1 row in set (0.00 sec)
```

注意：如果数据库已经确定了，里面有很多数据了，不要轻易修改表选项（字符集影响不大）

#### 修改表结构

**修改表名**：<font color=red>rename table</font> 旧表名 to 新表名

```
mysql> rename table class to allclass;
```

**新增加字段**：alter table 表名 <font color=red>add</font> [column] 新字段名 列类型 [列属性] [位置first/after
字段名]--默认为after <font color=skyblue>新增字段 字段名为age, 类型为int，加到开头位置</font>

```
mysql> alter table allclass add column age int first;
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc allclass;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| age   | int(11)     | YES  |     | NULL    |       |
| name  | varchar(10) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.02 sec)
```

**修改字段名：**alter table 表名 <font color=red>change</font> 旧字段名 新字段名 <font color=red>字段类型</font> [列属性] [新位置]

注意：<font color=red>字段类型</font>必须要有，不然报错

```
// 错误
mysql> alter table allclass change age nl;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 1

// 正确
mysql> alter table allclass change age nl int;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
// 类型为varchar的话，必须加长度
mysql> alter table allclass change name mz varchar(10);
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

**修改字段类型：**alter table 表名 <font color=red>modify</font> 字段名 新类型 [新属性] [新位置]

```
mysql> desc allclass;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| nl    | int(11)     | YES  |     | NULL    |       |
| mz    | varchar(10) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+


mysql> alter table allclass modify nl int(3);
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc allclass;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| nl    | int(3)      | YES  |     | NULL    |       |
| mz    | varchar(10) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
```

**删除字段：**alter table 表名 drop 字段名

```
mysql> alter table allclass drop nl;

mysql> desc allclass;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| mz    | varchar(10) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
1 row in set (0.02 sec)
```

#### 删除表结构

基础语法：drop table 表名[,表名2…]，可以同时删除多个数据表

```
mysql> show tables;
+-----------------------+
| Tables_in_db_practice |
+-----------------------+
| allclass              |
| copyppr               |
+-----------------------+


mysql> drop table allclass;


mysql> show tables;
+-----------------------+
| Tables_in_db_practice |
+-----------------------+
| copyppr               |
+-----------------------+
```



## 数据基础操作（`DQL`）

### 插入操作

本质含义：将数据以`SQL`的形式存储到指定的数据表（字段）里面

基本语法：向表中指定字段插入数据;

Insert into 表名[(字段列表)] values(对应字段列表)

```
mysql> desc copyppr;
+--------+------------+------+-----+---------+-------+
| Field  | Type       | Null | Key | Default | Extra |
+--------+------------+------+-----+---------+-------+
| age    | int(1)     | YES  |     | NULL    |       |
| gender | varchar(1) | YES  |     | NULL    |       |
+--------+------------+------+-----+---------+-------+

// 第一种（写出字段列表，顺序随便），（对应前面的字段顺序填写值）
mysql> insert into copyppr (gender,age) values('男',18);

// 第二种（可以只有部分表中字段）
mysql> insert into copyppr (gender) values('女');

// 第三种（可以不写字段列表，但是值列表必须与表中字段顺序一致）
mysql>  insert into copyppr values(20,'女');
```

### 查询操作

得到的结果都是虚拟表，而实表还是在硬盘中存储的表

#### select 语句

select 语句 是一个 子句，可以单独执行（相当于 `js` 中的 `console.log`）

````
// 查询函数：查询版本号
SELECT VERSION();
// 查询 用户
SELECT USER();
````

```
// 给字段起别名
// 语法：字段 AS 别名 或者 字段 别名, 字段 别名
SELECT VERSION() AS '版本号';

// 查询t_stuinfo表中的gender字段（别名为nl）stuname字段（别名为studentname）
SELECT gender AS nl, stuname AS studentname FROM t_stuinfo;
```

###### <font color=red>注意</font>

```
// 注意：当我们在使用有空格的字符串或者字符串中涉及关键字时，要用反引号或引号把字符串包起来
select gender as `年 龄`, stuname as 'name' from t_stuinfo;
```

select 后面的查询列表，可以是字段，还可以是变量，还可以是函数，多个查询列表选用逗号隔开。

#### 查询表中全部数据    （*表示匹配所有的字段）

语法：select * from 表名;

执行顺序：

1. from 子句
2. select 子句

```
mysql> select * from copyppr;
+------+--------+
| age  | gender |
+------+--------+
|   10 | 男     |
|    3 | 女     |
|    1 | 男     |
|   18 | 男     |
| NULL | 女     |
|   20 | 女     |
+------+--------+
6 rows in set (0.00 sec)
```

#### 查询表中部分数据

语法：select 字段列表 from 表名;      //字段列表使用逗号“,”隔开

```
mysql> select gender,age from copyppr;
+--------+------+
| gender | age  |
+--------+------+
| 男     |   10 |
| 女     |    3 |
| 男     |    1 |
| 男     |   18 |
| 女     | NULL |
| 女     |   20 |
+--------+------+
6 rows in set (0.00 sec)
```

#### 查询条件查询数据

语法：select 字段列表/* from 表名 where 字段名 = 值;  

```
// 查询 copyppr 表中 age字段的值为18 的 gender字段
mysql> select gender from copyppr where age = 18;
+--------+
| gender |
+--------+
| 男     |
| 女     |
+--------+
2 rows in set (0.00 sec)
// （得到两个 age为18的数据的gender字段）
```

##### `concat`方法(拼接字符串)

```
SELECT CONCAT(gender, '的', stuname) AS '谁' FROM t_stuinfo;
```

##### `ifnull` 方法（判断如果是null，用什么值代替）

```
SELECT CONCAT(IFNULL(gender, '性别未知'), '的', stuname) AS '谁' FROM t_stuinfo;
```

##### `distinct`去除重复数据

```
SELECT DISTINCT gender FROM t_stuinfo;
```



### 删除操作

基本语法：delete from 表名 [where 条件];      

//如果没有where条件：意味着系统会自动删除该表所有数据（慎用）

```
// 删除copyppr表中age字段值为3的数据
mysql> delete from copyppr where age = 3;
```

### 更新操作

***更新***：将数据进行修改（通常是修改部分字段数据）

**基本语法**：update 表名 set 字段名 = 新值 [where 条件];

//如果没有where条件，那么所有的表中对应的那个字段都会被修改成统一值。

```
// 把copyppr表中gender字段为男的数据中的age字段的值都改成18
mysql> update copyppr set age = 18 where gender = '男';
Query OK, 2 rows affected (0.01 sec)
Rows matched: 3  Changed: 2  Warnings: 0
```



## 字符集

### 字符编码概念

字符(Character)是各种文字和符号的总称，包括各国家文字、标点符号、图形符号、数字等。

在计算机中所看到的任何内容都是字符构成的。

字符编码（character code）是计算机针对各种符号，在计算机中的一种二进制存储代号。

### 字符集概念

字符集(`Characterset`)是多个字符的集合，字符集种类较多，每个字符集包含的字符个数不同。

常见字符集名称：`ASCII字符集、GB2312字符集、BIG5字符集、 GB18030字符集、Unicode字符集`等。计算机要准确的处理各种字符集文字，需要进行字符编码，以便计算机能够识别和存储各种文字。中文文字数目大，而且还分为简体中文和繁体中文两种不同书写规则的文字，而计算机最初是按英语单字节字符设计的，因此，对中文字符进行编码，是中文信息交流的技术基础。

### 设置客户端所有字符集

#### 为什么要设置客户端所有字符集呢

因为有时我们直接通过`cmd`下的`mysql.exe`进行中文数据插入时，可能会报错；

原因是：

1. 用户是通过`mysql.exe`来操作`mysqld.exe`
2. 真正的`SQL`执行是`Mysqld.exe`来执行
3. `mysql.exe`将数据传入`mysqld.exe`的时候，没有告知其对应的符号规则（字符集），而`mysqld.exe`也没有能力自己判断，就只会使用自己默认的字符集

所以：<font color=red>我们需要在`mysql.exe`客户端进行数据操作之前将自己所使用的字符集告诉`mysqld.exe` </font>

而且 `cmd` 默认只有一个 `GBK` 字符集，所以我们最好去告知服务端我们的字符集

#### 告知 `Mysqld.exe` 对应的字符集类型为 `gbk`

快捷方式：set names 字符集

```
mysql> set names gbk;
```

#### 查看客户端的对应的字符集关系

```
mysql> show variables like 'character_set%';
+--------------------------+---------------------------------------------------------+
| Variable_name            | Value                                                   |
+--------------------------+---------------------------------------------------------+
| character_set_client     | gbk                                                     |
| character_set_connection | gbk                                                     |
| character_set_database   | utf8                                                    |
| character_set_filesystem | binary                                                  |
| character_set_results    | gbk                                                     |
| character_set_server     | utf8                                                    |
| character_set_system     | utf8                                                    |
| character_sets_dir       | C:\Program Files\MySQL\MySQL Server 5.5\share\charsets\ |
+--------------------------+---------------------------------------------------------+
```

上面 `set names gbk` 的作用：同时改变

 `character_set_client`<font color=red>客户端</font> 客户端传入数据给服务端

`character_set_connection`<font color=red>服务端</font> 服务端返回数据给客户端

`character_set_results`<font color=red>连接层</font> 客户端与服务端之间的连接

这三个值为 `gbk`

这样就相当于一次性打通三层关系的字符集，变得一致。

#### 单独设置服务端变量的值

```
set 变量名 = 值
```

```
mysql> set character_set_results = utf8;

mysql> show variables like 'character_set%';
+--------------------------+---------------------------------------------------------+
| Variable_name            | Value                                                   |
+--------------------------+---------------------------------------------------------+
| character_set_client     | gbk                                                     |
| character_set_connection | gbk                                                     |
| character_set_database   | utf8                                                    |
| character_set_filesystem | binary                                                  |
| character_set_results    | utf8                                                    |
| character_set_server     | utf8                                                    |
| character_set_system     | utf8                                                    |
| character_sets_dir       | C:\Program Files\MySQL\MySQL Server 5.5\share\charsets\ |
+--------------------------+---------------------------------------------------------+
```

这样，当`character_set_client` 和 `character_set_results` 不一致时，就会出现乱码

所以我们还是应该最好用 `set names gbk;` 一次性解决


