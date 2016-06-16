/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports =
{
    name: "user",
    channel:"用户",
    fields: {
        _id: {type: 'string', dName: "编号"},
        name: {type: 'string', dName: "名称"},
        age: {type: 'int', dName: "年龄"}
    }
}