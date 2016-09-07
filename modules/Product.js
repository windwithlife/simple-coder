/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "product",
    channel:"产品",
    fields: {
        id: {type: 'Long', dName: "编号",show:false},
        name: {type: 'String', dName: "名称",show:true},
        sex: {type: 'int', dName: "性别", refer: {module:"category",map:"ManyToOne"} },
        age: {type: 'int', dName: "年龄"}
    }
}