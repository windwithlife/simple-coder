/**
 * Created by zhangyq on 2016/9/15.
 */

import React from 'react';
import {
    Container,
    Group,
    List,
    Badge,
    Card,
    Switch,
} from 'amazeui-touch';
import model from './models/model.js';


const img = <img width="32" src="http://lorempixel.com/128/128/people/" />;
const img80 = <img width="80" src="http://lorempixel.com/160/160/people/" />;
const img40 = <img width="48" src="http://lorempixel.com/160/160/people/" />;
const badge1 = <Badge rounded amStyle="alert">5</Badge>;

var displayItemsData = [];
var ItemData = {
    title: '',
    subTitle: '',
    after: '',
    href: '',
    desc: ''
};
function handleSwitch(e) {
    // get checkbox value
    console.log(this.refs.field.checked);
}

const mySwitch = <Switch onValueChange={handleSwitch} />;

const HomeList = React.createClass({
    getInitialState() {
        return {
            list: []
        };
    },
    componentWillMount(){
        var that = this;
        model.query(function(response){
            if(response){
                console.log(JSON.stringify(response.data));
                response.data.map(function(item, i){
                    var itemData ={};
                    itemData.title = item.name;
                    itemData.subTitle = item.name;
                    itemData.desc = item.description;
                    itemData.desc = "这是测试描术内容，请注意文本的长度有多少个字符，如果超过屏幕宽度的显示效果是什么情况";
                   // itemData.media=img40;
                    var picPath = "http://121.196.221.190:8080/" +　item.pic;
                    itemData.media= <img width="80" src={picPath} />;
                    itemData.after= '2016-09-28';

                    displayItemsData.push(itemData);
                });
                that.setState({list:displayItemsData});
            }
        });
    },
    render() {
        return (
            <Container {...this.props} scrollable >

                <Group
                    header="组件与静态列表"
                    noPadded
                    >
                    <List>
                        <List.Item role="header">A</List.Item>
                        <List.Item
                            after={<Badge rounded amStyle="success">5</Badge>}
                            title="List Item 1"
                            />

                        <List.Item
                            title="List Item 3"
                            after={mySwitch}
                            />
                        <List.Item
                            title="List Item 4"
                            />
                        <List.Item role="header">B</List.Item>
                        {this.state.list.map((dItem, i) => {
                            return (
                                <List.Item
                                    {...dItem}
                                    media={null}
                                    target="_blank"
                                    key={i}
                                    />
                            );
                        })}
                    </List>
                </Group>



                <Group
                    header="包含图标的列表"
                    noPadded
                    >
                    <List>
                        <List.Item
                            media={img}
                            after={badge1}
                            title="List Item 1"
                            />
                        <List.Item
                            media={img}
                            after="2015.08"
                            title="List Item 2"
                            href="#"
                            />
                        <List.Item
                            media={img}
                            after={badge1}
                            title="List Item 3"
                            href="#"
                            />
                    </List>
                </Group>


                <Group
                    header="含描述的文字列表"
                    noPadded
                    >
                    <List>
                        {this.state.list.map((album, i) => {
                            return (
                                <List.Item
                                    {...album}
                                    media={null}
                                    target="_blank"
                                    key={i}
                                    />
                            );
                        })}
                    </List>
                </Group>


                <Group
                    header="图文列表"
                    noPadded
                    >
                    <List>
                        {this.state.list.map((album, i) => {
                            return (
                                <List.Item
                                    {...album}
                                    target="_blank"
                                    desc={null}
                                    href={i === 0 ? null : album.href}
                                    key={i}
                                    />
                            );
                        })}
                    </List>
                </Group>

                <h3>Inset</h3>

                <List inset>
                    {this.state.list.map((album, i) => {
                        return (
                            <List.Item
                                {...album}
                                target="_blank"
                                desc={null}
                                href={i === 0 ? null : album.href}
                                key={i}
                                />
                        );
                    })}
                </List>



                <h3>Card卡片 嵌套</h3>

                <Card>
                    <List>
                        {this.state.list.map((album, i) => {
                            return (
                                <List.Item
                                    {...album}
                                    target="_blank"

                                    desc={null}
                                    href={i === 0 ? null : album.href}
                                    key={i}
                                    />
                            );
                        })}
                    </List>
                </Card>

            </Container>
        );
    }
});

export default HomeList;