CREATE USER 'mysql'@'%' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%' WITH GRANT OPTION;
ALTER USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'mysql';
CREATE DATABASE `releases`;
