/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "dictionary",
    channel:"字典表-各种简单类型",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "显示名称",show:'yes'}, 
        category: {type: 'int', dName: "字典类别", show:'yes', refer: {module:"category",map:"ManyToOne"} },
           
    }
}