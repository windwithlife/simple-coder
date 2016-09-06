/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "product",
    channel:"产品",
    fields: {
        id: {type: 'String', dName: "编号"},
        name: {type: 'String', dName: "名称"},
        sex: {type: 'int', dName: "性别", combo: true, enum: [{index: 1, item: "男"}, {index: 2, item: "女"}]},
        age: {type: 'int', dName: "年龄"}
    }
}