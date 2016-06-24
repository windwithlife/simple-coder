'use strict';
import React, { Component } from 'react';
import  {

    Navigator,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import JdWebView from '../compoents/WebView';
import List from './List';
import Detail from './Detail';

import TabPageNavigator from '../compoents/PageNavigator';

var routers ={main:List, webview:JdWebView,detail:Detail};

export default class HomeIndex extends Component {

    render() {

        return (<TabPageNavigator routers={routers} />)
    }

}



