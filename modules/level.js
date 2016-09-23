/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "level",
    channel:"社会阶层",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:true},
        description: {type: 'String', dName: "阶层描述",show:"yes"},
    }
}