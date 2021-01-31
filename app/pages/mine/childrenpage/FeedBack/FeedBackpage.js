import React, {Component} from 'react';
import {Alert, Button, Dimensions, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Minepageheader from '../../../components/minepageheader';
import Global from '../../../Global';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            uid: null,
            phone: null,
            title: '',
            content: '',
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
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    static navigationOptions = {
        headerShown: null,
    };

    // add() {
    //     let formData = {
    //         userid: this.state.userid,
    //         title: this.state.title,
    //         content: this.state.content,
    //         number: this.state.number,
    //     };

    //     fetch(gUrl.httpurl + '/addfeedback', {
    //         method: 'POST', //请求方法
    //         mode: 'cors',
    //         body: JSON.stringify(formData), //请求体
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => {
    //             res = JSON.parse(response._bodyText);
    //             if (res.code == 201) {
    //                 Alert.alert('提交成功');
    //             } else {
    //                 alert(res.msg);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

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
                    <Text style={{color: 'black', fontSize: 18}}>意见反馈</Text>
                </View>
                <View style={{height: 40, backgroundColor: '#ebebeb', justifyContent: 'center'}}>
                    <TextInput placeholder={'请输入标题'} onChangeText={(title) => this.setState({title})} />
                </View>
                <View style={{height: 5, flexDirection: 'row'}} />
                <View style={{height: 300, backgroundColor: '#ebebeb', justifyContent: 'center'}}>
                    <TextInput placeholder={'请输入详细问题'} onChangeText={(content) => this.setState({content})} />
                </View>
                <View style={{height: 5, flexDirection: 'row'}} />
                <View style={{height: 40, backgroundColor: '#ebebeb', justifyContent: 'center'}}>
                    <TextInput placeholder={'请输入您的联系方式'} onChangeText={(number) => this.setState({number})} />
                </View>
                <View style={{height: 50, flexDirection: 'row'}} />

                <Button onPress={() => this.add()} title="提交" color="red" />
            </View>
        );
    }
}
