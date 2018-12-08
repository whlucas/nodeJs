# 增
# insert into + 表名 + () 括号里面是给那些字段赋值 + values () 括号里面赋值
# 其中id不用设置,因为设置了自动递增了
show databases ;
use school;
insert into students (`stu_num`, `name`, `age`, `class`) values(1, "吴浩霖", 18, 9);
insert into students (`stu_num`, `name`, `age`, `class`) values(2, "xxx", 19, 6);
insert into students (`stu_num`, `name`, `age`, `class`) values(3, "adsf", 16, 3);
# 改
# 把这个表里面的age都设置成19
# 修改的这个命令很危险,它会把里面所有的数据都给改了
update students set age = 19;

# 如果我只想修改一个要给他加一个条件
update students set age = 2 where name = "吴浩霖";

# 同时修改两个属性
update students set age = 2, class = 3 where name = "吴浩霖";


# 查

# 查这个表里面所有的字段
# 这个慎用,方式数据太大卡死
select * from students;

# 查这个表里面的某个字段
select name, age from students; # 这个就只出来这两个值

# 我想查所有18岁的人
select * from students where age = 18;

# 我想查所有18岁的人的姓名
select name from students where age = 18;

# 我想知道这个班级一共有多少人
# select后面可以放一个函数,一般求总数一般是是count(1)
select count(1) from students;

# 求18岁的人一共有几个
select count(1) from students where age = 18;

# 我想求这个学校所有的人的年龄加起来的总数
# 用一个函数sum,里面放着我需要求和的属性
select sum(age) from students;

# 年龄是18岁的人的年龄总和
select sum(age) from students where age = 18;

# 求这个学校里面所有人的平均年龄
select sum(age)/count(1) from students;
# 实际上有个求平均的函数
select avg(age) from students;
# 我想让得出来的这个字段的名字改一下,改成avg_age
select avg(age) as avg_age from students;

# 求一下每个班级有多少人
# 我需要按班级来分组,每一个组求一个总人数
select count(1) from students group by class;

# 上面那样我不知道是几班的,我像这样把class加上,意思是先选出来班级,然后下一列在选出来每个班级有几个人
select class, count(1) from students group by class;
# 这里除了往前面加class可以加,别的字段都不能加,比如再加个name就不行,只有我group by哪一个才能往上面加哪一个
# 也就是说我只要group by了,我就只能是我这个组的所有的情况,我可以往上面加多个函数,比如我再加一个每一个组的平均年龄
select class, count(1), avg(age) from students group by class;

# where可以不止一个条件
# 查19岁并且班级是2班的人数
select count(1) from students where age = 19 and class = 2;

# 查年龄19或者班级是2班的人数
select count(1) from students where age = 19 or class = 2;

# 显示几个查找出来的内容
# 出来前两个结果
select * from students limit 2;

# 我想看后面的几页
# 这个表示每页有两个,我看第二页
select * from students limit 2, 2;
# 这个表示每页有三个我看第二页
select * from students limit 3, 2;

# 我想让他按照一定顺序显示
# 按照id正序排序
select * from students order by id;
# 按照id倒序排列
select * from students order by id desc ;
# 倒序之后分页查看
select * from students order by id desc limit 3, 2;


# 删
# 把表里面所有的数据都删了
delete from students;

# 想删什么加where条件
delete from students where name = xxx;