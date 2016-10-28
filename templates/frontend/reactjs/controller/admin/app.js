import React from 'react';
import {
    render,
} from 'react-dom';

import {
    Container,
    TabBar,
    NavBar,
    View,
} from 'amazeui-touch';
import 'amazeui-touch/dist/amazeui.touch.min.css';

const backNav = {
    component: Link,
    icon: 'left-nav',
    title: "Back",
    to: '/',
    onlyActiveOnIndex: true,
};



class App extends React.Component {

    render() {
        var children = this.props.children;
        var location = this.props.location;
        const transition = children.props.transition || 'sfr';
        const name = children.props.name || 'default title';
        var props = this.props;
        return (
            <View>
            <NavBar title= {name} leftNav={[backNav]} amStyle="primary" />

            <Container
        transition={transition}
        scrollable
        >
                {React.cloneElement(children,props)}
        </Container>
        </View>

    );
    }
}

export default App;
