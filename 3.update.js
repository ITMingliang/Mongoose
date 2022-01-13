//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;

//Model.update(conditions,[projection],[options],[callback])
//Model.updateOne(conditions,[projection],[options],[callback])
//Model.updateMany(conditions,[projection],[options],[callback])
//----参数
//     ---conditions  查询条件
//     ---doc         修改后的对象，也可以使用修改器$set:
//     ---options     配置参数
//     ---callback    回调

//修改唐僧的年龄为8岁
Student.updateOne({name:"孙悟空"},{$set:{age:8}},function(err){
if(!err){
console.log("修改成功~~~");
}
})

//修改孙悟空的年龄为888岁
Student.updateMany({name:"孙悟空"},{$set:{age:888}},function(err){
    if(!err){
    console.log("修改成功~~~");
    }
    })

//修改孙悟空的年龄为58岁，存在多个，只修改第一个
Student.update({name:"孙悟空"},{$set:{age:58}},{multi:false},function(err){
    if(!err){
    console.log("修改成功~~~");
    }
    })

