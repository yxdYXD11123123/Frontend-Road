/*
SQLyog Ultimate v8.32 
MySQL - 5.5.49 : Database - day09
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`day09` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `day09`;

/*Table structure for table `institutions` */

DROP TABLE IF EXISTS `institutions`;

CREATE TABLE `institutions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '机构id',
  `ins_number` varchar(255) DEFAULT NULL COMMENT '机构号',
  `gname` varchar(255) DEFAULT NULL COMMENT '机构名称',
  `state` int(11) DEFAULT NULL COMMENT '机构状态：0:禁用 1：启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `institutions` */

insert  into `institutions`(`id`,`ins_number`,`gname`,`state`) values (1,'4325465','顺顺教育机构',1),(2,'6549043','新东方',1),(3,'5320802','蓝翔',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
