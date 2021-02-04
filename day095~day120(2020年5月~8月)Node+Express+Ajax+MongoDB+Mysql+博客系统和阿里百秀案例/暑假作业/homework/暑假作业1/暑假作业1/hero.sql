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

/*Table structure for table `hero` */

DROP TABLE IF EXISTS `hero`;

CREATE TABLE `hero` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '英雄编号',
  `hname` varchar(255) DEFAULT NULL COMMENT '英雄名称',
  `nickname` varchar(255) DEFAULT NULL COMMENT '英雄外号',
  `skill` varchar(255) DEFAULT NULL COMMENT '英雄技能',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `hero` */

insert  into `hero`(`id`,`hname`,`nickname`,`skill`) values (1,'盖伦','德玛西亚之力','躲草丛');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
