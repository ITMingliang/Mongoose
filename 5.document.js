//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;

/*
    document的对象进行操作文档
        Model.save([options],[fn]);
*/

/*
    1.创建Document
*/
var stu=new Student(
    {
        name:"王母娘娘",
        age:200,
        gender:"fale",
        address:"天庭"
    }
);

//保存到数据库
stu.save(function(err){
    if(!err){
        console.log("保存成功~~~");
    }
});

/*
    2.修改对象：
*/

 stu.age=1800;
 stu.save();


/*
        3.获取与设置文档的属性
        get(name)
            --获取文档指定的属性值
        set(name)
            --设置文档的属性值
*/


//新对象模型
var stu =new Student(
    {
        name:"孙悟空"
    }
);

//set赋值
stu.set("name","美猴王");
stu.age=101;
stu.gender="male";
stu.address="花果山"
stu.save();
console.log(stu);

//get获取
console.log(stu.get("age"));
console.log(stu.age);


/*  
    4.删除object属性，只有先转为普通object后，才能进行删除
*/

var obj=stu.toObject();
delete obj.gender;
console.log("普通Object才能删除属性值");

//打印出的obj将不会出现gender字段
console.log(obj);

//普通对象获取不到_id字段
console.log("id："+obj.id);//获取不到id，===> id：undefined
console.log("_id"+obj._id);//可以获取到_id



/*
   5.删除对象
*/


stu.remove(function(err){
    if(!err){
        console.log("再见~~~~")
    }
});

