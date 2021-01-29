import React, {Component} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import Indexheader from '../../../../components/indexheader';
import Global from '../../../../Global';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerShown: null,
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Indexheader />
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 50}}
                        source={require('./../../../../../../static/img/2.png')}
                    />
                    <Text style={{fontSize: 30, color: 'black'}}>毕业设计</Text>
                    <Text style={{fontSize: 20, color: 'red'}}>基于React Native的</Text>
                    <Text style={{fontSize: 20, color: 'red'}}>B2C电商平台APP的设计与实现</Text>
                    <Text />
                    <Text style={{fontSize: 20, color: 'black'}}>指导老师</Text>
                    <Text />
                    <Text style={{fontSize: 25, color: 'red'}}>许克杰</Text>
                    <Text />
                    <Text style={{fontSize: 20, color: 'black'}}>开发</Text>
                    <Text />
                    <Text>向子忱 2019284340</Text>
                </View>
            </View>
        );
    }
}
