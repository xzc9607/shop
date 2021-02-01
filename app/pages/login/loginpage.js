/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import Button from 'react-native-button';
import Global from '../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class Loginpage extends Component {
    constructor(props, context) {
        super(props, context);
        //AsyncStorage.clear();
        this.state = {
            username: '',
            password: '',
            uid: '',
        };
    }

    static navigationOptions = {
        headerShown: null,
    };

    login() {
        let formData = {
            username: this.state.username,
            password: this.state.password,
        };

        if (formData.username === '') {
            Alert.alert('请输入用户名!');
            return;
        } else if (formData.username !== '' && formData.password === '') {
            Alert.alert('请输入密码!');
            return;
        }

        fetch(gUrl.httpurl + '/users/Login', {
            method: 'POST', //请求方法
            mode: 'cors',
            body: JSON.stringify(formData), //请求体
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((responses) => responses.json())
            .then((res) => {
                if (res.code === 1) {
                    AsyncStorage.setItem('user', formData.username)
                        .then((responses) => {
                            fetch(gUrl.httpurl + '/users')
                                .then((responses) => responses.json())
                                .then((res) => {
                                    var temp = JSON.parse(JSON.stringify(res.list));
                                    for (var i = 0; i < temp.length; i++) {
                                        if (temp[i].username === formData.username) {
                                            this.setState({uid: temp[i].uid});
                                            console.log(this.state.uid);
                                            AsyncStorage.setItem('uid', this.state.uid.toString())
                                                .then((responses) => {
                                                    this.props.navigation.navigate('Main');
                                                })
                                            .catch((responses) => {
                                                //console.log(formData.username);
                                                Alert.alert('存入失败');
                                            });
                                        }
                                    }

                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((responses) => {
                            console.log(formData.username);
                            Alert.alert('存入失败');
                        });
                } else {
                    Alert.alert('用户名或密码错误!');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <View style={{marginTop: 10}}>
                    <Image style={login.logintitle} source={require('./../../../static/img/2.png')} />
                </View>

                <Text style={login.font1}>XX商城</Text>

                <TextInput
                    style={login.textInput1}
                    placeholder={'请输入用户名'}
                    onChangeText={(username) => this.setState({username})}
                    underlineColorAndroid={'gray'}
                />
                <TextInput
                    style={login.textInput2}
                    placeholder={'请输入密码'}
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                />

                <Button
                    style={{fontSize: 20, color: 'white'}}
                    styleDisabled={{color: 'red'}}
                    containerStyle={{
                        padding: 5,
                        height: 40,
                        width: 280,
                        marginTop: 50,
                        overflow: 'hidden',
                        borderRadius: 12,
                        backgroundColor: 'red',
                    }}
                    onPress={() => this.login()}>
                    登陆
                </Button>

                <View style={{marginTop: 40, flexDirection: 'row'}}>
                    <View style={{width: width / 2, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Forgetpasswordpage')}>
                            <Text>忘记密码</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{width: width / 2, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Registerpage')}>
                            <Text style={{color: 'red'}}>新用户注册</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const login = StyleSheet.create({
    logintitle: {
        width: 111,
        height: 74,
        marginTop: 30,
        resizeMode: 'contain',
    },
    font1: {
        color: 'black',
        fontSize: 18,
        marginTop: 20,
    },
    font2: {
        fontSize: 14,
        marginTop: 10,
    },
    textInput1: {
        //height: 50,
        width: 280,
        marginBottom: 5,
        //textAlign: 'center',
        //flex: 5,
        fontSize: 18,
        marginTop: 40,
    },
    textInput2: {
        //height: 50,
        width: 280,
        marginBottom: 5,
        //textAlign: 'center',
        //flex: 5,
        fontSize: 18,
        marginTop: -20,
    },
});
