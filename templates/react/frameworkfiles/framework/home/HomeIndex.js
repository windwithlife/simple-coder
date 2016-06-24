'use strict';
import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import JdWebView from '../compoents/WebView';
import HomePage from './HomePage';
import TabPageNavigator from '../compoents/PageNavigator';

var routers ={main:HomePage, webview:JdWebView};

export default class HomeIndex extends Component {

    render() {

        return (<TabPageNavigator routers={routers} />)
    }

}



