

exports.all = {
    webRoot: "../web/manage/",
    appName: "test",
    modules : ["Product","User"],
    channels : [{name:"产品管理系统",children:[{name:"产品管理查询首面",module:"ProductMainView"},{name:"产品管理发布",module:"ProductMainView"}]},
        {name:"用户管理系统",children:[{name:"用户管理查询首面",module:"UserMainView"}]}]
}