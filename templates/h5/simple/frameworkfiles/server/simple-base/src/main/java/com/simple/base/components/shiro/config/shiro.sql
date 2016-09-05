/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2016-05-21 21:07:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for SysPermission
-- ----------------------------

-- ----------------------------
-- Records of SysPermission
-- ----------------------------
INSERT INTO `Sys_Permission` (id, available,name,parent_Id,parent_Ids,permission,resource_Type,url) VALUES ('1', 1, 'UserManager', '0', '0/', 'userInfo:view', 'menu', 'userInfo/userList');
INSERT INTO `Sys_Permission` (id, available,name,parent_Id,parent_Ids,permission,resource_Type,url) VALUES ('2', 1, 'User Add', '1', '0/1', 'userInfo:add', 'button', 'userInfo/userAdd');
INSERT INTO `Sys_Permission` (id, available,name,parent_Id,parent_Ids,permission,resource_Type,url) VALUES ('3', 1, 'User Delete', '1', '0/1', 'userInfo:del', 'button', 'userInfo/userDel');


-- ----------------------------
-- Records of SysRole
-- ----------------------------
INSERT INTO `Sys_Role` (id, available,description,role) VALUES ('1', 1, 'Administrator', 'admin');
INSERT INTO `Sys_Role` (id, available,description,role) VALUES ('2', 1, 'VIP Member', 'vip');


-- ----------------------------
-- Records of SysRolePermission
-- ----------------------------
INSERT INTO `Sys_Role_Permission` VALUES ('1', '1');
INSERT INTO `Sys_Role_Permission` VALUES ('1', '2');


-- ----------------------------
-- Records of SysUserRole
-- ----------------------------
INSERT INTO `Sys_User_Role` VALUES ('1', '1');
INSERT INTO `Sys_User_Role` VALUES ('1', '2');



-- ----------------------------
-- Records of UserInfo
-- ----------------------------
	/*INSERT INTO `User` (id,name,username,password,salt,state) VALUES ('1', 'Administrator', 'admin', 'd3c59d25033dbf980d29554025c23a75', '8d78869f470951332959580424d4bf4f', '0');*/
	INSERT INTO `User` (id,name,username,password,salt,state) VALUES ('1', 'Administrator', 'admin', '123456', '8d78869f470951332959580424d4bf4f', '0');
