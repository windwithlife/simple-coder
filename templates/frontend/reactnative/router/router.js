import React from 'react';
import {
    render,
} from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    withRouter,
} from 'react-router';
import {
    Container,
    TabBar,
    NavBar,
    View,
} from 'amazeui-touch';

const backNav = {
    component: Link,
    icon: 'left-nav',
    title: '返回',
    to: '/',
    onlyActiveOnIndex: true,
};



class App extends React.Component {

    render() {
        var children = this.props.children;
        var location = this.props.location;
        const transition = children.props.transition || 'sfr';
        const name = children.props.name || 'default title';
        return (
            <View>
            <NavBar title= {name} leftNav={[backNav]} amStyle="primary" />

            <Container
        transition={transition}
        scrollable
        >
        {children}
        </Container>
        </View>

    );
    }
}

// Pages
//import Index from './pages/Index';
//import Page from './Page';
import Home from './home';
import Edit from './edit';
import Add from './add';
import DetailInfo from './info';
import Index from './index';
import NotFound from './NotFound';


// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
const routes = (
    <Router history={hashHistory}>
    <Route path="/" component={App}>

    <Route path="/index" component={Index} />
    <Route path="/home" component={Home} />
    <Route path="/add" component={Add} />
    <Route path="/edit" component={Edit} />
    <Route path="/info" component={DetailInfo} />
    <IndexRoute component={Index} />
    <Route path=":page" component={NotFound} />

    </Route>
    </Router>
);

//render(routes, document.getElementById('mycontainer'));

window.addEventListener('load', () => {
    render(routes, document.getElementById('mycontainer'));
},false);

//document.addEventListener('DOMContentLoaded', () => {
//  render(routes, document.getElementById('mycontainer'));
//});
