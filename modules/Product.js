/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "product",
    channel:"产品",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        age: {type: 'int', dName: "年龄",show:'yes'},
        level: {type: 'int', dName: "阶层", show:'yes', refer: {module:"level",map:"ManyToOne"} },
       
        sex: {type: 'int', dName: "性别",show:'dictionary',refer:{module:'dictionary',map:"ManyToOne",category:"sex"}},
        pic: {type: 'String', dName: "图片",show:'image'},
        "productImg": {type: 'String', dName: "产品详情图片",show:'image'}
    }
}