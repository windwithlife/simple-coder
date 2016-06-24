'use strict';

var React = require('react');
var { Component} = React;
var ReactNative = require('react-native');
//var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    PixelRatio,
    TouchableHighlight
    } = ReactNative;

var server = "http://192.168.0.100:3000";
var messagesTab = React.createClass({
    updateDataSource: function(data){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        })
    },
    openChat: function (user){
        var barTitle = user.firstName +"-"+ user.lastName;
        this.props.nav.push({
            id: 'detail',
            title: barTitle,
            passProps: { person:user },
        });
    },
    renderRow: function (person){
        //var time = prettyTime(person.lastMessage.timestamp);
        return (
            <View>
                <TouchableHighlight onPress={ this.openChat.bind(this, person) }>
                    <View>
                <View style={ styles.row }>
                    <Image
                        source={ { uri: person.picture } }
                        style={ styles.cellImage }
                        />
                    <View style={ styles.textContainer }>
                        <Text style={ styles.name } numberOfLines={ 1 }>
                            { person.firstName } { person.lastName }
                        </Text>
                        <Text style={ styles.time } numberOfLines={ 1 }>
                            {person.userID}:{person.lost}
                        </Text>
                        <Text style={ styles.lastMessage } numberOfLines={ 1 }>
                            { person.score }
                        </Text>
                    </View>
                </View>
                <View style={ styles.cellBorder } />
                </View>
            </TouchableHighlight>
            </View>
        );
    },
    componentWillMount: function() {
        fetch(server + '/api/v1/user/test')
            .then(res => res.json())
            .then(res => this.updateDataSource(res.list[0].users));
    },
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        };
    },
    render: function() {
        return (
            <View style={ styles.container }>

                <ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow } />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10
    },
    textContainer: {
        flex: 1
    },
    cellImage: {
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        width: 60
    },
    time: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        color: '#cccccc'
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2
    },
    lastMessage: {
        color: '#999999',
        fontSize: 12
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginLeft: 4
    }
});


module.exports = messagesTab;