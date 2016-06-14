exports.all = {
    appName: "test",
    modules: ["Product", "User"],
    channels:
        [{
            name: "产品管理系统",
            children: [{name: "产品管理查询首面", module: "Product"}, {name: "产品管理发布", module: "Product"}]
        },
        {
            name: "用户管理系统",
            children: [{name: "用户管理查询首面", module: "User"}]
        }],
    moduledefines:
        [{name:'product',defines :{
            _id:{type:'string', dName:"编号"},
            name:{type:'string',dName:"名称"},
            sex :{type:'int',dName:"性别",combo:true, enum:[{index:1,item:"男"},{index:2,item:"女"}]},
            age :{type:'int',dName:"年龄"}

        }},
            {name:'user',defines:{
           _id: {type: 'string', dName: "编号"},
           name:{type: 'string',dName: "名称"},
           age:{type:'int', dName:"年龄"}
       }}]
}