//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;

/*
    ---统计文档的数量
    Model.count(conditions,[callback])
*/

//不传入条件就是查询所有文档
Student.count({},function(err,count){
    if(!err){
        console.log(count);
    }
});


//查询指定条件的文档个数
Student.count({name:"猪八戒"},function(err,count){
    if(!err){
        console.log(count);
    }
});
