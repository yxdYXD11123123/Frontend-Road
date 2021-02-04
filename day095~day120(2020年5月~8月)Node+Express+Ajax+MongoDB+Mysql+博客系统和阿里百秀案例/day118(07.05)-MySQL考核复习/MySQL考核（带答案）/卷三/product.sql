/*Table structure for table `orderitem` */

-- 订单表

CREATE TABLE `orderitem` (
  `cid` VARCHAR(50) DEFAULT NULL,
  `pid` VARCHAR(50) DEFAULT NULL,
  `count` INT(11) DEFAULT NULL,
  `ordertime` DATETIME DEFAULT NULL
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Data for the table `orderitem` */

INSERT  INTO `orderitem`(`cid`,`pid`,`count`,`ordertime`) VALUES ('c001','p001',5,'2018-04-01 00:00:00'),('c001','p002',2,'2018-04-07 00:00:00'),('c001','p004',2,'2018-04-07 00:00:00'),('c002','p003',10,'2018-05-01 00:00:00'),('c002','p005',5,'2018-05-01 00:00:00'),('c003','p004',5,'2018-05-10 00:00:00'),('c004','p001',5,'2018-05-10 00:00:00'),('c004','p002',2,'2018-05-01 00:00:00'),('c005','p003',10,'2018-05-01 00:00:00');

/*Table structure for table `product` */

-- 产品表
CREATE TABLE `product` (
  `pid` VARCHAR(50) NOT NULL DEFAULT '',
  `pname` VARCHAR(50) DEFAULT NULL,
  `price` DOUBLE DEFAULT NULL,
  `stock` INT(11) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Data for the table `product` */

INSERT  INTO `product`(`pid`,`pname`,`price`,`stock`) VALUES ('p001','计算机',5000,20),('p002','空调',2400,60),('p003','冰箱',1500,20),('p004','沙发',800,10),('p005','打印机',1100,50);