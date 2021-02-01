import React, {Component} from 'react';
import {
    Button,
    Dimensions,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import Indexheader from '../components/indexheader';
import Swipercomponent from '../components/swipercomponent';
// eslint-disable-next-line no-unused-vars
import Global from '../Global';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class Productpage extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '个性SUV',
            isOpen: false,
            data: null,
            uid: '',
        };
        AsyncStorage.getItem('uid', function (error, result) {
            if (error) {
                Alert.alert('读取失败');
            } else {
                console.log(result);
            }
        }).then((result) => {
            this.setState({uid: result});
            this.setState({data: this.props.navigation.state.params});
        });
    }

    //添加关注车辆
    addfocus() {
        let formData = {
            uid: this.state.uid,
            pid: this.props.navigation.state.params.item.pid,
        };

        // eslint-disable-next-line no-undef
        fetch(gUrl.httpurl + '/focus/addfocus', {
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
                //res = JSON.parse(response._bodyText);
                if (res.affectedRows === 1) {
                    Alert.alert('关注成功');
                } else {
                    Alert.alert(res.msg);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            //头部
            <View style={styles.container}>
                <Indexheader />

                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={styles.swiperview}>
                        <Swipercomponent />
                    </View>

                    <View style={{height: 50, backgroundColor: 'red', justifyContent: 'center'}}>
                        <Text style={{fontSize: 25, color: 'white', marginStart: 20}}>
                            {this.props.navigation.state.params.item.productname}
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <View style={{height: 160, width: width - 40, marginTop: 20}}>
                            <View>
                                <Text style={{fontSize: 20, color: 'black'}}>
                                    {this.props.navigation.state.params.item.kind}
                                </Text>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text>厂商指导价：{this.props.navigation.state.params.item.price}</Text>
                            </View>
                            {/* <View style={{alignItems: 'flex-end'}}>
                                <View
                                    style={{
                                        height: 20,
                                        width: 200,
                                        backgroundColor: 'red',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{color: 'white'}}>服务费2888，砍0元开新车</Text>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={{}}>已售1台</Text>
                                </View>
                            </View> */}
                            <View style={{height: 1, backgroundColor: '#ebebeb'}} />
                            <View style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
                                <View style={styles.listhead}>
                                    <Text style={{color: 'white'}}>XX商城</Text>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        Linking.openURL('tel:13812345678');
                                    }}>
                                    <Text>详情【立即咨询】卖家</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>

                    <View style={{height: 10, backgroundColor: '#ebebeb'}} />

                    <WebView
                        source={{uri: 'http://m.baidu.com/'}}
                        // injectedJavaScript={
                        //     'document.getElementsByClassName("crumbs")[0].remove();' +
                        //     'document.getElementsByClassName("nav clearfix")[0].remove();' +
                        //     'document.getElementsByClassName("cartype-name")[0].remove();' +
                        //     'document.getElementsByClassName("fixed-vs")[0].remove();' +
                        //     'document.getElementsByClassName("list-slidenav")[0].remove();' +
                        //     'document.getElementsByClassName("footer")[0].remove();'
                        // }
                        style={{height: 500}}
                    />
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: width / 2}}>
                        <Button onPress={() => this.addfocus()} title="关注该车" color="#ff4d00" />
                    </View>

                    <View style={{width: width / 2}}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Purchasepage', this.state.data)}
                            title="立刻购买"
                            color="red"
                        />
                    </View>
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
    listhead: {
        borderRadius: 5,
        height: 20,
        width: 48,
        backgroundColor: '#FF2d16',
    },
});
