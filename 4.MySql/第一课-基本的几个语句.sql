# 注意每一行后面要加分号

show databases; # 显示数据库

use mysql; # 连接使用其中的哪一个

show tables; # 显示所有的表

# 数据库的层级 库 -> 表 -> 字段(属性)

desc db; # 查看db这个表的字段

show create table db; # 看一下这个表的创建语句是什么

select * from db; # 查看db这个表里面所有的数据

# 创建一个我自己的数据库school
create database school;