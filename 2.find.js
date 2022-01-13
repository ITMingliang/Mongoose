//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;

//查询所有符合条件的文档
//Model.find(conditions,[projection],[options],[callback])
//------------conditions  查询条件
//------------projection  投影
//------------options     查询选项
//------------callback    回调函数，查询结果会通过回调函数返回


//1.查询Student所有的文档
Student.find({},function(err,docs){
    if(!err){
        console.log(docs);
    }
});

//2.按照条件查找
Student.find({ name:"猪八戒"},function(err,docs){
    if(!err){
        console.log(docs);
    }
});


//3.根据文档的id属性查询文档
//Model.find(id,[projection],[options],[callback])
//投影：1为显示，0为不显示
Student.findById("61df72013ac93c6f99e5ac5d",{name:1,age:1,_id:0},function(err,docs){
    if(!err){
        console.log(docs);
    }
});


//4.投影查找
//"name age -_id"
Student.find({ name:"猪八戒"},"name age address -_id" ,function(err,docs){
    if(!err){
        console.log(docs);
    }
});

//5.使用skip和limit进行分页显示
Student.find({ },"name age -_id",{skip:1,limit:2} ,function(err,docs){
    if(!err){
        console.log(docs);
    }
});


//6.查询符合条件的第一个文档
//Model.findOne([conditions],[projection],[options],[callback])
Student.findOne({ name:"猪八戒"},{name:1,age:1,address:1, _id:0},function(err,docs){
    if(!err){
        console.log(docs);
    }
});



