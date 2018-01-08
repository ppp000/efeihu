/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : profile

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-01-08 20:44:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reg_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('11', 'p', 'cfcd208495d565ef66e7dff9f98764da', null, '2018-01-07 21:04:29');
INSERT INTO `user` VALUES ('7', '', 'd41d8cd98f00b204e9800998ecf8427e', null, '2018-01-07 20:46:52');
INSERT INTO `user` VALUES ('8', 'pppp', '0000', null, '2018-01-07 20:48:50');
INSERT INTO `user` VALUES ('9', 'pp', 'b4b147bc522828731f1a016bfa72c073', null, '2018-01-07 20:49:09');
INSERT INTO `user` VALUES ('10', 'ppppp', 'dcddb75469b4b4875094e14561e573d8', null, '2018-01-07 20:50:01');
INSERT INTO `user` VALUES ('12', 'ppp', '000', null, '2018-01-07 21:07:47');
INSERT INTO `user` VALUES ('14', 'qweasd', 'b59c67bf196a4758191e42f76670ceba', null, '2018-01-07 21:13:32');
INSERT INTO `user` VALUES ('15', 'qweas', '4a7d1ed414474e4033ac29ccb8653d9b', null, '2018-01-07 21:15:15');
INSERT INTO `user` VALUES ('16', 'dsgdfgfdgd', '44941badfccb8bbd2f148d84c8ab9314', null, '2018-01-07 21:15:33');
INSERT INTO `user` VALUES ('17', 'dgfgjhj', '7fa8282ad93047a4d6fe6111c93b308a', null, '2018-01-07 21:15:47');
INSERT INTO `user` VALUES ('18', 'fsdhfc', '74ee9f66611c591d442a852cd3fa7186', null, '2018-01-07 21:17:00');
INSERT INTO `user` VALUES ('19', 'qwewqeqwdas', '4822971ffb881725e40dc7faf82ba48d', null, '2018-01-07 22:03:43');
INSERT INTO `user` VALUES ('20', 'qweqweqwe', '580539cf96c3de01abf3bdd25e05b108', null, '2018-01-07 22:07:50');
INSERT INTO `user` VALUES ('21', '1231231231', 'e5cbec3f27793b0d2042f5c280205f73', null, '2018-01-07 22:08:06');
INSERT INTO `user` VALUES ('23', '1231231', 'c89519ed5a5e351d36d2519e244cfbd7', null, '2018-01-07 22:08:45');
INSERT INTO `user` VALUES ('24', '1232132131', 'a3dcb4d229de6fde0db5686dee47145d', null, '2018-01-07 22:09:11');
INSERT INTO `user` VALUES ('25', 'qwewqwewq55', '056e8adea707ce6c5c37a93f4b5c6fed', null, '2018-01-07 22:09:50');
INSERT INTO `user` VALUES ('26', 'qweqweqw', 'a74bed2ff5c0529bea188f5eb6527f95', null, '2018-01-07 22:10:10');
INSERT INTO `user` VALUES ('27', '123213213', '9db790aea3bf99339033db665021ff49', null, '2018-01-07 22:11:26');
INSERT INTO `user` VALUES ('29', 'pppppfds', 'e22f845d07cdd0d3510c12c129c9029b', null, '2018-01-08 11:51:28');
SET FOREIGN_KEY_CHECKS=1;
