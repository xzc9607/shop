/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {Dimensions, Text, TextInput, View, Alert} from 'react-native';
import Button from 'react-native-button';
import Global from '../../Global';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class Register extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            password2:'',
            phone: '',
        };
    }

    static navigationOptions = {
        title: '注册',
    };

    isallright(){
        if (this.state.password !== this.state.password2){
            Alert.alert('提示','请确认两次密码输入相同！');
        } else if (this.state.username === ''){
            Alert.alert('提示','请输入用户名！');
        } else if (this.state.password === ''){
            Alert.alert('提示','请输入密码！');
        } else {
            this.register();
        }
    }

    register(){
        let formData = {
            username: this.state.username,
            password: this.state.password,
            phone: this.state.username,
        };
        fetch(gUrl.httpurl + '/users/Register', {
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
                console.log(res);
                if (res.affectedRows === 1) {
                    Alert.alert('提示','注册成功，点击返回登录界面',[{text:'确定',onPress:()=>{this.props.navigation.navigate('Loginpage');}}]);
                } else {
                    Alert.alert('提示','注册失败！');
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
                <View style={{width: width - 40}}>
                    <TextInput placeholder="手机号" onChangeText={(username) => this.setState({username})} />
                    <View style={{height: 1, backgroundColor: 'gray'}} />
                </View>
                <View style={{width: width - 40}}>
                    <TextInput placeholder="设置密码" onChangeText={(password) => this.setState({password})} />
                    <View style={{height: 1, backgroundColor: 'gray'}} />
                </View>
                <View style={{width: width - 40}}>
                    <TextInput placeholder="请再次输入密码" onChangeText={(password2) => this.setState({password2})}/>
                    <View style={{height: 1, backgroundColor: 'gray'}} />
                </View>
                <View style={{width: width - 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: ((width - 40) / 3) * 2}}>
                        <TextInput placeholder="请输入短信验证码" />
                        <View style={{height: 1, backgroundColor: 'gray'}} />
                    </View>

                    <View style={{width: (width - 40) / 3}}>
                        <Text style={{color: 'red'}}> 获取验证码</Text>
                    </View>
                </View>

                <Button
                    style={{fontSize: 20, color: 'white'}}
                    styleDisabled={{color: 'red'}}
                    containerStyle={{
                        padding: 5,
                        height: 40,
                        width: width - 40,
                        marginTop: 50,
                        overflow: 'hidden',
                        borderRadius: 12,
                        backgroundColor: 'red',
                    }}
                    onPress={() => this.isallright()}>
                    注册
                </Button>
            </View>
        );
    }
}
