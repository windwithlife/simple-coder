'use strict';
import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    View,
     Platform
} from 'react-native';

// 导航栏的Mapper
var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {if (index > 0) {navigator.pop()}}}>
                        <Text style={styles.leftNavButtonText}>
                            后退
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null;
        }
    },
    // 右键
    RightButton(route, navigator, index, navState) {
        if (route.onPress)
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        onPress={() => route.onPress()}>
                        <Text style={styles.rightNavButtonText}>
                            {route.rightText || '右键'}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
    },
    // 标题
    Title(route, navigator, index, navState) {
        return (
            <View style={styles.navContainer}>
                <Text style={styles.title}>
                    {route.title}
                </Text>
            </View>
        );
    }
};

export default class TabPageNavigator extends Component {
    componentWillMount() {
        //var routers = this.props.routers;
        //Alert.alert('提示', '你点击了:' + JSON.stringify(routers));
    }

    render() {
        var routers = this.props.routers;
        return (
            <Navigator
                initialRoute={{name: 'main',title:'首页', index: 0, id:'main'}}
                renderScene={(route, navigator) => TabPageNavigator._renderPage(route,navigator,routers)}
                navigationBar={
                  <Navigator.NavigationBar
                    style={styles.navContainer}
                    routeMapper={NavigationBarRouteMapper}/>
                }
                />
        )
    }

    static _renderPage(route, nav, routers) {

        var Page = routers[route.id];
        return (<View style={styles.container} ><Page  nav={nav} url={route.url} {...route.passProps}/></View>);

    }
}


var styles = StyleSheet.create({
    // 页面框架
    container: {
        flex: 4,
        marginTop: 60,
        flexDirection: 'column'
    },
    // 导航栏
    navContainer: {
        backgroundColor: '#000000',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 10,
    },
    // 导航栏文字
    headText: {
        color: '#ffffff',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#ff1049',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18,
        color: '#ffffff'
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginLeft: 13
    },
    // 右面导航按钮
    rightNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginRight: 13
    },
    // 标题
    title: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        flex: 1                //Step 3
    }
});



