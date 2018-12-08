# 双击students库
# 就可以显示我创建的表
# 然后点加号就可以增加信息 我添加完了之后点db提交,发现报错
# 原因是字符集不是utf8 不支持中文

# 两个解决办法
# 第一个是用命令解决:
# 修改编码要改三层
# 第一层是库,第二层是表,第三层是字段

# 先连上我这个表
show databases ;
use school;

# 首先改库的
alter database school character set utf8;
# 改标的
alter table students default character set utf8;
# 改字段的
alter table students convert to character set utf8;

# 改了这三行我在表那边提交中文的时候就可以提交了


# 这样的话我每新建一个就都要改一下相应的字符集


# 第二个方法
# 我在开始里面找到mySQL workbench 8.0 CE
# 我连接一下我的数据库,然后找到我的school点一下,右边有一个设置, 点开
# 字符集选utf8,右边那个校验集选utf8 general_ci - apply
# 然后点我创建的表,然后设置 字符集选utf8,右边那个校验集选utf8 general_ci - apply
# 然后选择我的带有varchar的字段选上以后,下面有一个设置字符集的 字符集选utf8,右边那个校验集选utf8 general_ci - apply

# 我也可以直接在这里面创建表啊什么的,在创建的时候皆可以选择字符集,创建的方式差不多,里面有一个B(是不是二进制的)不要选,UN(无符号数)不要选,ZF不要选,G(不要选)

