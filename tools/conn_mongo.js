/*
    定义一个模块，用来连接MongoDB数据库
*/

//引入模块
var mongoose=require("mongoose");
//连接数据库
mongoose.connect("mongodb://127.0.0.1/test");//,{useMongoClient:true}

//监听
mongoose.connection.once("open",function(){
    console.log("数据库连接成功~~~~");
});

mongoose.connection.once("close",function(){
    console.log("数据库连接已经断开~~~~");
});


//断开数据库连接
//mongoose.disconnect();
