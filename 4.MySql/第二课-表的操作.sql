# 创建表
# 要求:用工具来创建表,但是要认识语句
# 点school按右键new table
# 创建一个students表,每一个表必须有一个主键,设置主键名,值类型,Default(默认值)

# 主键不可以含有逻辑,不能含有意义 例:不能用身份证号拿来做主键

# 也可以两个字段做主键

# 值类型:
# int         整数
# bigint(21)  长整数 通常后面跟一个括号后面传一个数字代表这个整数的位数通常传21
# float       浮点数
# double      双精度浮点数
# varchar(16) 字符串 这个括号里面的数字就可以随意写了
# text        文本

# Comment 主键的备注公司要求这个备注必须要写,这里写上:student id
# 底下还有几个选项
# Not null    : 这个值可不可以为空 , 这里勾上
# Auto inc    : 自动递增, 一般只有主键勾上这个
# unique      : 唯一 一般不勾上,因为要勾上最后一个,勾上最后一个就代表这个了
# Primary key : 是不是主键,  勾上

# 然后再创建一些其他的属性,类似创建主键这样

use school; # 链接我的这个创建的school数据库

show create table students; # 看一下我创建的这个表的代码

# 看一下我上一行命令打出来的创建这个表的代码
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'students id',
  `stu_num` int(11) NOT NULL COMMENT 'students number',
  `name` varchar(32) NOT NULL COMMENT 'students name',
  `age` int(11) NOT NULL COMMENT 'students age',
  `class` int(11) NOT NULL COMMENT 'students class',
  PRIMARY KEY (`id`), # 主键是哪一个
  UNIQUE KEY `students_stu_num_uindex` (`stu_num`) # 给主键起一个名 后面是这个主键对哪一个字段进行索引
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
# ENGINE数据库的引擎名
# InnoDB: 适合 读较多,写也较多.   因为他的是行级锁,如果同时有其他的请求来写,如果照我正在写的地方较远是可以写的
# MYISAM: 适合 读很多,写的非常少. 他读的性能比innoDB要好一些,写的时候是表级锁,我在往表里写东西的同时,如果再来一个请求还要往里面写东西的话,是不可以的,表是被锁住的,必须的等这个写完了,下一个才能写,如果写的量很大的话则会出现堵塞
# DEFAULT CHARSET=latin1 默认字符集是latin1 通常应该设置为utf8



# 如果我想往这个表里面加点属性,对这个表右键Modify Table就可以加了
# 这个就是帮我生成的修改表的一段代码
alter table students add math int not null comment 'students math';

# 删除一个属性
# Modify Table 里面选中一个属性点一下减号
# 就相当于下面的代码
alter table students drop column math;