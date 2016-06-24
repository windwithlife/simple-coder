/**
 * Created by ctrip on 16/6/5.
 */

var React = require('react');
var { Component} = React;
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,

    ActivityIndicatorIOS,
    Image,
    TouchableHighlight,
    Alert
    } = ReactNative;

var server = "http://192.168.0.100:3000";
var Person = React.createClass({

    render: function() {
        var person = this.props.person;
        return (
            <View style={ styles.person }>
                <Image style={ styles.personImage } source={ { uri: person.picture } } />
                <TouchableHighlight onPress={ this.props.onPress }>
                <View style={ styles.personInfo }>
                    <Text style={ styles.personName }>
                        { person.firstName } { person.lastName }
                    </Text>
                    <View style={ styles.personScore }>
                        <Text style={ styles.personScoreHeader }>
                            WON
                        </Text>
                        <Text style={ [styles.personScoreValue, styles.won] }>
                            { person.won }
                        </Text>
                    </View>
                    <View style={ styles.personScore }>
                        <Text style={ styles.personScoreHeader }>
                            LOST
                        </Text>
                        <Text style={ [styles.personScoreValue, styles.lost] }>
                            { person.lost }
                        </Text>
                    </View>
                    <View style={ styles.personScore }>
                        <Text style={ styles.personScoreHeader }>
                            SCORE
                        </Text>
                        <Text style={ styles.personScoreValue }>
                            { person.score }
                        </Text>
                    </View>
                </View>
                    </TouchableHighlight>
            </View>
        )
    }
});

var facemashTab = React.createClass({
    getInitialState: function() {
        return {
            list: [],
            currentIndex: 0
        };
    },
    componentWillMount: function() {
        fetch(server+'/api/v1/user/test')
            .then(res => res.json())
            .then(res => this.setState({ list: res.list }));
    },
    onPersonPress: function() {
        var index = this.state.currentIndex + 1;
        if (index < this.state.list.length) {
            this.setState({
                currentIndex: this.state.currentIndex + 1
            });
        }
    },
    render: function() {var contents;
        if (!this.state.list.length) {
            contents = (
                <View style={ styles.loading }>
                    <Text style={ styles.loadingText }>Loading</Text>
                    <ActivityIndicatorIOS />
                </View>
            )
        } else {
            var { list, currentIndex } = this.state;
            var users = list[currentIndex].users;
            var peoples = users.map(person => <Person person={ person } onPress ={this.onPersonPress}/>);
            //var peoples = users.map(person => <Text>person</Text>);
            contents = (
                <View style={ styles.content }>
                    {peoples}
                </View>
            )
        }
        return (
            <View style={ styles.container }>

                { contents }
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: 14,
        marginBottom: 20
    },
    header: {
        height: 50,
        backgroundColor: '#760004',
        paddingTop: 20,
        alignItems: 'center'
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    person: {
        flex: 1,
        margin: 10,
        borderRadius: 3,
        overflow: 'hidden'
    },
    personInfo: {
        borderLeftColor: 'rgba( 0, 0, 0, 0.1 )',
        borderLeftWidth: 1,
        borderRightColor: 'rgba( 0, 0, 0, 0.1 )',
        borderRightWidth: 1,
        borderBottomColor: 'rgba( 0, 0, 0, 0.1 )',
        borderBottomWidth: 1,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    personImage: {
        flex: 1,
        height: 200
    },
    personName: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 5
    },
    personScore: {
        flex: 0.25,
        alignItems: 'center'
    },
    personScoreHeader: {
        color: 'rgba( 0, 0, 0, 0.3 )',
        fontSize: 10,
        fontWeight: 'bold'
    },
    personScoreValue: {
        color: 'rgba( 0, 0, 0, 0.6 )',
        fontSize: 16
    },
    won: {
        color: '#93C26D'
    },
    lost: {
        color: '#DD4B39'
    }
});



module.exports = facemashTab;
