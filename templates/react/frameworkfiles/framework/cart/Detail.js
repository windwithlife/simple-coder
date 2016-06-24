'use strict';

var React = require('react');
var { Component} = React;
var ReactNative = require('react-native');

var {
    StyleSheet,
    Text,
    View
    } = ReactNative;
var messageView = React.createClass({
    render: function(){
        var user = this.props.person;
        return (
            <View style={ styles.container }>
                <Text>Chat with { user.firstName } { user.lastName }</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 64
    },
});

module.exports = messageView;