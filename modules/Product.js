/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "product",
    channel:"产品",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:true},
        sex: {type: 'int', dName: "性别" },
        level: {type: 'int', dName: "性别", refer: {module:"level",map:"ManyToOne"} },
        age: {type: 'int', dName: "年龄"},
        pic: {type: 'String', dName: "图片"}
    }
}