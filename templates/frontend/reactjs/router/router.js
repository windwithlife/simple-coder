import React from 'react';
import {
    render,
} from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    browserHistory,
    withRouter,
} from 'react-router';

import Home from './home';
import Edit from './edit';
import Add from './add';
import DetailInfo from './info';
import List from './list';
import NotFound from './NotFound';
import App from './app';


// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
const routes = (

    <Router history={browserHistory}>
    <Route path="/client/product" component={App}>

    <Route path="home" component={Home} />
    <Route path="list" component={List} />
    <Route path="add" component={Add} />
    <Route path="edit" component={Edit} />
    <Route path="info" component={DetailInfo} />
    <IndexRoute component={Home} />
    <Route path=":page" component={NotFound} />

    </Route>
    </Router>
   );

  render(routes, document.getElementById('mycontainer'));



