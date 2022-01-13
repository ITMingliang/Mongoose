/*
    定义student的模型
*/

//引入模块
var mongoose=require("mongoose");

//将mongoose.Schema 赋值给一个变量
var Schema =mongoose.Schema;

//创建Schema对象
var stuSchema=new  Schema(
    {
        name:String,
        age:Number,
        gender:{
            type:String,
            default:"famale"
        },
        address:String
    }
);

//定义模型：通过Schema来创建Model
//mongoDB会判断name是否是复数，如果不是复数，将会在创建的时，默认给collection添加s，变成复数
var StuModel=mongoose.model("student",stuSchema);

//导出1
exports.model=StuModel;//对应引用：var Student=require("./models/student").model;

//导出2
//module.exports=StuModel;//对应引用：var Student=require("./models/student");