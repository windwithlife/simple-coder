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
    getDefaultProps () {
        return {
            name : '列表页33'
        };
    },
    componentWillMount(){
        this.props.actions.queryList();
    },
    render() {
        return (
            <Container {...this.props} scrollable >

                <Group
                    header="图文列表4"
                    noPadded
                    >
                    <List>
                        {this.props.listData.map((album, i) => {
                            return (
                                <List.Item
                                    {...album}
                                    title = {album.name}
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
                    {this.props.listData.map((album, i) => {
                        return (
                            <List.Item
                                {...album}
                                target="_blank"
                                desc={null}
                                href={i === 0 ? null : album.href}
                                after={mySwitch}
                                key={i}
                                />
                        );
                    })}
                </List>



                <h3>just 嵌套</h3>

                <Card>
                    <List>
                        {this.props.listData.map((album, i) => {
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
