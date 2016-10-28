import Immutable from 'immutable'
import React from 'react';

const initialItems = Immutable.List([1, 2, 3])

export default function items(state = initialItems, action) {
    switch(action.type) {
        case "HOME_ALL":
        {
            var displayItemsData = [];
            if (action.list){
                action.list.map(function(item, i){
                    var itemData ={};
                    itemData.title = item.name;
                    itemData.subTitle = item.name;
                    itemData.desc = item.description;
                    itemData.desc = "这是测试描术内容，请注意文本的长度有多少个字符，如果超过屏幕宽度的显示效果是什么情况";

                    var picPath = "http://121.196.221.190:8080/" +　item.pic;
                    itemData.media= <img width="80" src={picPath} />;
                    itemData.after= '2016-09-28';
                    displayItemsData.push(itemData);
                });
            }
            return state.list = displayItemsData;
        };
        case "DELETE_ALL":
            return state.list.clear();
        default:
            return state
    }
}
