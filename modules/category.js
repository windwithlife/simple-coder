/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "category",
    channel:"字典表-各种简单类型",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "字典类别名称",show:'yes'},
        description: {type: 'String', dName: "类别用途描述", show:'yes'},
           
    }
}