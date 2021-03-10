import React, {Component} from 'react';
import {Button, Dimensions, Image, ScrollView, StyleSheet, Text, View, Alert, TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Indexheader from '../components/indexheader';
import Icon from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line no-unused-vars
import Global from '../Global';
import {TextInput} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class Purchase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trueSwitchIsOn1: true,
            falseSwitchIsOn1: false,
            trueSwitchIsOn2: true,
            falseSwitchIsOn2: false,
            quantity: '1',
            username: '',
            uid: null,
            address: '',
            phone: '',
        };
        this.data = {
            username: '',
            uid: null,
            address: '',
            phone: '',
        };
        AsyncStorage.getItem('user', function (error, result) {
            if (error) {
                Alert.alert('读取失败');
            } else {
            }
        }).then((result) => {
            this.setState({username: result});
            this.data.username = result;
            //console.log(result);
        });
        AsyncStorage.getItem('uid', function (error, result) {
            if (error) {
                Alert.alert('读取失败');
            } else {
            }
        }).then((result) => {
            this.setState({uid: result});
            this.data.uid = result;
            //console.log(this.state.uid);
            // eslint-disable-next-line no-undef
            fetch(gUrl.httpurl + '/users/getUserById?uid=' + this.state.uid)
                .then((responses) => responses.json())
                .then((res) => {
                    var temp = JSON.parse(JSON.stringify(res.list));
                    this.setState({phone: temp[0].phone});
                    this.data.phone = temp[0].phone;
                    this.setState({address: temp[0].address});
                    this.data.address = temp[0].address;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        //console.log(this.state.uid);
    }

    static navigationOptions = {
        headerShown: false,
    };

    addorder() {
        let formData = {
            uid: this.data.uid,
            pid: this.props.navigation.state.params.item.pid,
            address: this.state.address,
            name: this.state.username,
            phone: this.state.phone,
        };
        console.log(this.data);
        // eslint-disable-next-line no-undef
        fetch(gUrl.httpurl + '/orders/addorder', {
            method: 'POST', //请求方法
            mode: 'cors',
            body: JSON.stringify(formData), //请求体
            headers: {
                // eslint-disable-next-line prettier/prettier
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((responses) => responses.json())
            .then((res) => {
                console.log(res);
                //res = JSON.parse(response._bodyText);
                if (res.affectedRows === 1) {
                    Alert.alert('购买成功');
                } else {
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Indexheader />
                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={{height: 3, backgroundColor: '#ebebeb'}} />
                    <View style={{height: 60, flexDirection: 'row'}}>
                        <View style={{width: width / 8, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                <Icon name="home" size={25} color="red" />
                            </View>
                        </View>

                        <View style={{width: width, justifyContent: 'center'}}>
                            <View>
                                <Text style={{fontSize: 17}}>
                                    {this.state.username} {this.state.phone}
                                </Text>
                                <Text style={{fontSize: 17, color: 'black'}}>{this.state.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 3, backgroundColor: '#ebebeb'}} />
                    <View style={{backgroundColor: 'white'}}>
                        <View style={styles.listtext}>
                            <View style={{width: (2 * width) / 5, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    resizeMode="stretch"
                                    style={styles.listimage}
                                    source={require('./../../../static/img/p1.jpg')}
                                />
                            </View>
                            <View style={styles.listbody}>
                                <View style={{width: (3 * width) / 5}}>
                                    <Text style={{color: 'black', fontSize: 22}}>
                                        {this.props.navigation.state.params.item.productname}
                                    </Text>
                                    <Text style={{color: 'gray', fontSize: 15}}>
                                        类别:{this.props.navigation.state.params.item.kind}
                                    </Text>
                                    <View style={{height: 50}} />
                                    <Text style={{color: '#FF2d16', fontSize: 15}}>
                                        ￥{this.props.navigation.state.params.item.price}/件
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 3, backgroundColor: '#ebebeb'}} />
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                width: (width / 10) * 9.3,
                            }}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{fontSize: 17}}>购买数量</Text>
                                <View style={{width: 10}} />
                                <TextInput
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                    }}
                                    value={this.state.quantity}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{height: 3, backgroundColor: '#ebebeb'}} />
                    <View style={{height: 200}}>
                        <View
                            style={{
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 10,
                            }}>
                            <Icon name="wechat" size={25} color="#04BE02" />
                            <Text>微信支付</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#ebebeb'}} />
                        <TouchableHighlight>
                            <View
                                style={{
                                    height: 50,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 10,
                                }}>
                                <Icon name="alipay-circle" size={25} color="#027AFF" />
                                <Text>支付宝</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View>
                    <Button onPress={() => this.addorder()} title="提交订单" color="red" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    center: {
        height: 45,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    center2: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: -5,
    },
    logo: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
        marginLeft: -50,
    },
    text1: {
        fontSize: 20,
        color: 'black',
        marginTop: 10,
        marginStart: 5,
    },
    text2: {
        fontSize: 11,
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    },
    swiperview: {
        height: 150,
    },
    swiperview2: {
        height: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    wrapper: {
        height: 50,
    },
    slide: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        width,
    },
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 0,
    },
    zero: {
        height: 150,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zerobox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: (width / 8) * 7,
        backgroundColor: '#FF2d16',
        borderRadius: 10,
        flexDirection: 'row',
    },
    listtext: {
        height: 130,
        flexDirection: 'row',
    },
    listbody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listimage: {
        height: 120,
        width: width / 3,
        resizeMode: 'contain',
    },
    touchButton: {
        height: 40,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#fa1faa',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    touchButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});
