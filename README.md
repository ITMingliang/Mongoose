# Mongoose入门

## 一、概念

* **Schema（模式对象）**
  * schema对象定义约束了数据库中的文档结构
* **Model（模型）**
  * Model对象最为集合中的所有文档的表示，相当于MongoDB数据库中的集合colllection
* **Document（文档）**
  * Document表示集合中的具体文档，相当于集合中的一个具体的文档

## 二、环境搭建和配置

* **下载安装Mongoose**

  > npm i mongoose --save

   ![image](https://img2020.cnblogs.com/blog/1913282/202201/1913282-20220113103415255-310778859.png)

* **在项目引用Mongoose**

  > var mongoose =require("mongoose ");

* **连接MongoDB数据库**

  > mongoose.connect('mongodb://数据库的IP地址：端口号/数据库名',{useMongoClient:true})

  如果端口号是默认端口号（27017），则可以省略不写

* **断开数据库连接**

  > mongoose.disconnect();

* **监听MongoDB数据库的连接状态**

  在mongoose的对象中，有一个属性叫connection，改对象表示的就是数据库的连接

  通过监听该对象的状态，可以监听数据库的连接和断开

  * 数据库连接成功的事件

    > mongoose.connection.once('open',function(){});

  * 数据库断开的事件

    > mongoose.connection.once('close',function(){});


## 三、文件目录

 ![image](https://img2020.cnblogs.com/blog/1913282/202201/1913282-20220113103436076-341467149.png)

## 四、模块文件代码

* **conn_mongo.js**

> 负责连接数据库模块

```js
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
```

* **student.js**

> 负责定义模型模块

```js
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
```

## 五、JS代码

**在js代码中，首先都要在头部引用上面的两个模块**

引用方法：

```js
//引入和导入模块
require("./tools/conn_mongo");
var Student = require("./models/student").model;
```

* **1.insert.js**

```js
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

```

* **2.find.js**

```js
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

```

* **3.update.js**

```js
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

```

* **4.count.js**

```js
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
```

* **5.document.js**

```js
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

```

* **6.delete.js**

```js
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

```

## 六、运行JS代码

**终端运行命令：```node js文件名```，如：**

> node 1.insert.js
>
> node 2.find.js
>
> node 3.update.js
>
> node 4.count.js
>
> node 5.document.js
>
> node 6.delete.js
