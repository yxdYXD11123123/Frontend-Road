/*
SQLyog Ultimate v8.32 
MySQL - 5.5.49 : Database - day08
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`day08` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `day08`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `cname` varchar(250) DEFAULT NULL COMMENT '类别名称',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`cid`,`cname`) values (1,'潮科技'),(2,'潮生活');

/*Table structure for table `posts` */

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `pid` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章编号',
  `ptitle` varchar(55) DEFAULT NULL COMMENT '文章标题',
  `pname` varchar(55) DEFAULT NULL COMMENT '别名',
  `publish_time` date DEFAULT NULL COMMENT '发表时间',
  `state` varchar(55) DEFAULT NULL COMMENT '状态：已发布/草稿',
  `uid` int(11) DEFAULT NULL COMMENT '用户编号',
  `cid` int(11) DEFAULT NULL COMMENT '商品类别编号',
  PRIMARY KEY (`pid`),
  KEY `uid` (`uid`),
  KEY `cid` (`cid`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `posts` */

insert  into `posts`(`pid`,`ptitle`,`pname`,`publish_time`,`state`,`uid`,`cid`) values (1,'5G','5G时代','2016-10-07','已发布',2,1);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(220) DEFAULT NULL,
  `password` varchar(220) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`uid`,`username`,`password`) values (1,'admin','admin'),(2,'小小','123');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
