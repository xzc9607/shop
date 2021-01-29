import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    BackHandler,
    ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class IndexPage extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => <Icon name="home" size={25} color="#ffffff" />,
    };

    constructor(props, context) {
        super(props);
    }

    render() {
        return <Text>主页</Text>;
    }
}
