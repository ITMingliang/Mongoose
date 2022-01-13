//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;

/*
    删除：
    Model.remove(conditions,[callback])     删除一个或者多个,可拆分如下两个
    Model.deleteOne(conditions,[callback])  删除一个
    Model.deleteMany(conditions,[callback]) 删除多个

*/

//删除符合条件一个或多个文档
Student.remove({name:"美猴王"},function(err){
    if(!err){
    console.log("删除成功~~~")
    }
});

//存在多个符合条件情况下，仅仅删除一个文档
Student.deleteOne({name:"猴子"},function(err){
    if(!err){
    console.log("删除成功~~~")
    }
});

//删除所有符合查询条件文档
Student.deleteMany({name:"王母娘娘"},function(err){
    if(!err){
    console.log("删除成功~~~")
    }
});
