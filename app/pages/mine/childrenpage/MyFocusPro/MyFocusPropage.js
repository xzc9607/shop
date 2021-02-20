import React, {Component} from 'react';
import {Text, View, Image, Dimensions, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Minepageheader from '../../../components/minepageheader';
//import Global from '../../../Global';
const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class myFocusPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            uid: null,
            data: null,
        };
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
                    fetch(gUrl.httpurl + '/focus/getFocusListByUid?uid=' + this.state.uid)
                        .then((responses) => responses.json())
                        .then((res) => {
                            this.setState({data: res});
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
        header: null,
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
                    <Text style={{color: 'black', fontSize: 18}}>关注商品</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <View
                            style={{
                                width: width,
                                height: 130,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View style={{width: width / 3, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                                    source={require('./../../../../../static/img/p1.jpg')}
                                />
                            </View>
                            <View style={{width: width / 3}}>
                                <Text>{item.productname}</Text>
                            </View>
                            <View style={{width: width / 3, justifyContent: 'center', alignItems: 'center'}}>
                                <View
                                    style={{
                                        width: width / 5,
                                        height: 25,
                                        backgroundColor: 'red',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{color: 'white'}}>取消关注</Text>
                                </View>
                                <View style={{height: 10}} />
                                <View
                                    style={{
                                        width: width / 5,
                                        height: 25,
                                        backgroundColor: 'red',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{color: 'white'}}>查看详情</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}
