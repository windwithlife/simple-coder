use mydb;
insert into sys_role (id, role,description) values(1, 'ROLE_ADMIN','a administrator role');
INSERT INTO user (id, username, password,state) VALUES (1, 'admin', '123456',1);
insert into sys_user_role (uid,role_id) values(1, 1);