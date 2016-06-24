'use strict';
import React, { Component } from 'react';
import  {

    StyleSheet,
    Image,
    Text,
    View,
    Navigator,
    AppRegistry
} from 'react-native';





import HomeIndex from './home/HomeIndex';
import CartIndex from './cart/CartIndex';
import CategoryIndex from './category/Index';

import TabNavigator from 'react-native-tab-navigator';

const HOME = 'home';
const HOME_NORMAL =require('./images/tabs/home_normal.png');
const HOME_FOCUS = require('./images/tabs/home_focus.png');
const CATEGORY = 'category';
const CATEGORY_NORMAL = require('./images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('./images/tabs/category_focus.png');
const FAXIAN = 'faxian';
const FAXIAN_NORMAL = require('./images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('./images/tabs/faxian_focus.png');
const CART = 'cart';
const CART_NORMAL = require('./images/tabs/cart_normal.png');
const CART_FOCUS = require('./images/tabs/cart_focus.png');
const PERSONAL = 'personal';
const PERSONAL_NORMAL = require('./images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('./images/tabs/personal_focus.png');


class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME}
    }

    _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    static _createChildView(tag) {
        if (tag== 'home'){ return (<HomeIndex />)}
        if (tag== 'cart'){ return (<CartIndex />)}
        if (tag== 'category'){ return (<CategoryIndex />)}

        return (

            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>
            </View>
        )
    }

    render() {
        //debugger;
        return (
            <View style={{flex: 1}}>

                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, MainScreen._createChildView(HOME))}
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, MainScreen._createChildView(CATEGORY))}
                    {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, MainScreen._createChildView(FAXIAN))}
                    {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, MainScreen._createChildView(CART))}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, MainScreen._createChildView(PERSONAL))}
                </TabNavigator>
            </View >
        );
    }


}


//styles
const styles = StyleSheet.create({
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});

AppRegistry.registerComponent('youRN', () => MainScreen);