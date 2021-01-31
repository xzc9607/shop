import React, {Component} from 'react';
import {Dimensions, FlatList, Text, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Minepageheader from '../../../components/minepageheader';
import Global from '../../../Global';
const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class MyAdvice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userid: null,
            data: null,
        };
        //测试数据
        this.data1 = [
            {
                title: '1',
                content: '123',
                number: '1',
            },
        ];
        AsyncStorage.getItem('user', function (error, result) {
            if (error) {
                Alert.alert('读取失败');
            } else {
            }
        }).then((result) => {
            this.setState({username: result});
            // eslint-disable-next-line no-undef
            fetch(gUrl.httpurl + '/users')
                .then((responses) => responses.json())
                .then((res) => {
                    var temp = JSON.parse(JSON.stringify(res.list));
                    for (var i = 0; i < temp.length; i++) {
                        if (temp[i].username === this.state.username) {
                            this.setState({uid: temp[i].uid});
                        }
                    }
                    // eslint-disable-next-line no-undef
                    fetch(gUrl.httpurl + '/feedback/getFeedbackListByUid?uid=' + this.state.uid)
                        .then((responses) => responses.json())
                        .then((res) => {
                            this.setState({data: res});
                            console.log(this.state.data);
                            //console.log(this.state.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    static navigationOptions = {
        headerShown: null,
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Minepageheader />

                <View
                    style={{
                        height: 50,
                        width: width,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{color: 'black', fontSize: 18}}>我的反馈</Text>
                </View>

                <FlatList
                    //data={this.state.data}
                    data={this.state.data}
                    renderItem={({item}) => (
                        <View style={{height: 120}}>
                            <View style={{marginEnd: 5}}>
                                <View style={{height: 38, flexDirection: 'row'}}>
                                    <View>
                                        <Text style={{fontSize: 18}}>内容：</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: 'black', fontSize: 18}}>{item.content}</Text>
                                    </View>
                                </View>
                                <View style={{height: 38, flexDirection: 'row'}}>
                                    <View>
                                        <Text style={{fontSize: 18}}>回复：</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: 'black', fontSize: 18}}>{item.reply}</Text>
                                    </View>
                                </View>
                                <View style={{height: 38, flexDirection: 'row'}}>
                                    <View>
                                        <Text style={{fontSize: 18}}>状态：</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: 'black', fontSize: 18}}>{item.state}</Text>
                                    </View>
                                </View>
                                <View style={{height: 5, backgroundColor: '#ebebeb'}} />
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}
