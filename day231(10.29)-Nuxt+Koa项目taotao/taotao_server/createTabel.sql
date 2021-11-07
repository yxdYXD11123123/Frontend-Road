USE taotao_server;
# 一级分类
CREATE TABLE `category` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`categoryName` VARCHAR(50) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `category`(`id`, categoryName) VALUES (1, '运动馆'),(2,'女士馆'),(3,'男士馆'),(4,'帆布馆'),(5,'户外馆');
# 二级分类
CREATE TABLE `brand` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `brandName` VARCHAR(50) DEFAULT NULL,
  `categoryId` INT(11) DEFAULT NULL,
  `brandLogo` VARCHAR(200) DEFAULT NULL,
  `hot` INT(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT  INTO `brand`(`id`,`brandName`,`categoryId`,`brandLogo`,`hot`) VALUES (1,'耐克',1,'/images/brand1.png',1),(2,'阿迪',1,'/images/brand2.png',1),(3,'新百伦',1,'/images/brand3.png',1),(4,'哥伦比亚',1,'/images/brand4.png',0),(5,'匡威',1,'/images/brand5.png',1),(6,'阿萨德1',2,'/images/brand5.png',1),(7,'阿萨德2',2,'/images/brand5.png',1);

# 用户
CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) DEFAULT NULL, 
  `password` VARCHAR(100) DEFAULT NULL,
  `mobile` CHAR(11) DEFAULT NULL,
  `smscode` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


# 订单
CREATE TABLE `order`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `appid` VARCHAR(50) NOT NULL,
  `mch_id` VARCHAR(50) NOT NULL,
  `open_id` VARCHAR(50) DEFAULT NULL,
  `body` VARCHAR(100) NOT NULL,
  `out_trade_no` VARCHAR(50) NOT NULL,
  `total_fee` VARCHAR(50) NOT NULL,
  `spbill_create_ip` VARCHAR(50) NOT NULL,
  `trade_type` VARCHAR(20) NOT NULL,
  `trade_state` VARCHAR(20) NOT NULL,
  `transaction_id` VARCHAR(50) DEFAULT NULL
)
