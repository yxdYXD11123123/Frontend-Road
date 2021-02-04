/*
SQLyog Ultimate v8.32 
MySQL - 5.5.49 : Database - day03
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`day03` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `day03`;

/*Table structure for table `course` */

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `cid` varchar(10) NOT NULL,
  `cName` varchar(10) DEFAULT NULL,
  `tid` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `course` */

insert  into `course`(`cid`,`cName`,`tid`) values ('001','企业管理',3),('002','马克思',3),('003','UML',2),('004','数据库',1),('005','英语',1);

/*Table structure for table `sc` */

DROP TABLE IF EXISTS `sc`;

CREATE TABLE `sc` (
  `sid` varchar(10) DEFAULT NULL,
  `cid` varchar(10) DEFAULT NULL,
  `score` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sc` */

insert  into `sc`(`sid`,`cid`,`score`) values ('1001','001',80),('1001','002',60),('1001','003',75),('1002','001',85),('1002','002',70),('1003','004',100),('1003','001',90),('1003','002',55),('1004','002',65),('1004','003',60);

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `sid` varchar(10) NOT NULL,
  `sName` varchar(20) DEFAULT NULL,
  `sAge` datetime DEFAULT '1980-10-12 23:12:36',
  `sSex` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`sid`,`sName`,`sAge`,`sSex`) values ('1001','张三丰','1980-10-12 23:12:36','男'),('1002','张无极','1995-10-12 23:12:36','男'),('1003','李奎','1992-10-12 23:12:36','女'),('1004','李元宝','1980-10-12 23:12:36','女'),('1005','李世明','1981-10-12 23:12:36','男'),('1006','赵六','1986-10-12 23:12:36','男'),('1007','田七','1981-10-12 23:12:36','女');

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `tid` int(10) DEFAULT NULL,
  `tName` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`tid`,`tName`) values (1,'李老师'),(2,'何以琛'),(3,'叶平');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
