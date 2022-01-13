//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;


/*
     拿到model，就可以对数据库进行增删改查操作
*/

//1.Model.create(doc(s),[callback])
//----单个或多个文档并太黏到数据库
//----参数
//    ---doc(s): 可以是一个文档对象，也可以是多个文档对象
//    ---callback: 当操作完成以后调用的回调函数


//-------插入一个
Student.create({
    name:"玉皇大帝",
    age:108,
    gender:"male",
    address:"天庭"
},function(err){
    if(!err){
        console.log("插入数据成功~~~")
    }
    });


//-------插入多个
Student.create([
    {
        name:"孙悟空",
        age:18,
        gender:"male",
        address:"花果山"
    },
{
    name:"猪八戒",
    age:28,
    gender:"male",
    address:"猪圈"
},{
    name:"沙僧",
    age:38,
    gender:"male",
    address:"白沙河"
},{
    name:"唐僧",
    age:48,
    gender:"male",
    address:"女儿国"
}],function(err){
    if(!err){
        console.log("插入数据成功~~~")
    }
});


