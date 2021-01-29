import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Global from '../Global';

export default class Indexheader extends Component {
    render() {
        return (
            <View>
                <View style={{height: 45, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                        style={{width: 45, height: 45, resizeMode: 'contain', marginLeft: -50}}
                        source={require('./../../../static/img/2.png')}
                    />
                    <Text style={{fontSize: 20, color: 'black', marginTop: 10, marginStart: 5}}>XX商城</Text>
                </View>
            </View>
        );
    }
}
