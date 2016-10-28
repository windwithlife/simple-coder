import React from 'react';
import {
    render,
} from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory

} from 'react-router';




import { bindActionCreators,compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider,connect } from 'react-redux'
import ImmutableRenderMixin from 'react-immutable-render-mixin'
import rootReducer from './reducers'
import * as ItemsActions from './actions'

var buildStore = compose(applyMiddleware(thunk))(createStore);
const store = buildStore(rootReducer);
const RootApp = connect(state => ({
    "listData" : state.listData,
    "addData" : state.addData,
    "updateData" : state.updateData,
    "deleteData":state.deleteData,
    "homeData":state.homeData
}), dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(App);

// Pages
import App  from '../app' ;
import Home from '../home';
import Edit from '../edit';
import Add from '../add';
import DetailInfo from '../info';
import List from '../list';
import NotFound from '../NotFound';


// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
const routes = (
    <Provider store={store}>
    <Router history={hashHistory}>
    <Route path="/" component={RootApp}>

    <Route path="/home" component={Home} />
    <Route path="/list" component={List} />
    <Route path="/add" component={Add} />
    <Route path="/edit" component={Edit} />
    <Route path="/info" component={DetailInfo} />
    <IndexRoute component={Home} />
    <Route path=":page" component={NotFound} />

    </Route>
    </Router>
        </Provider>
);

render(routes, document.getElementById('mycontainer'));


