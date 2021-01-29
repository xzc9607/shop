import React, {Component} from 'react';
import {Text, View, Image, Dimensions, FlatList} from 'react-native';
import Minepageheader from '../../../components/minepageheader';
//import Global from '../../../Global';
const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class myOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userid: null,
            data: null,
        };

        this.car = [
            {
                id: 'eP44uaH7G9q8TUS1lIVk23A11',
                brand: '北汽幻速1',
                label: null,
                model: '2017款幻速S5 1.3T 手动尊贵型',
                guidePrice: '7.68万',
            },
            {
                id: 'KQlopnITGNOZzfiu6S6yG3A11',
                brand: '北汽幻速',
                label: null,
                model: '2015款幻速H3 1.5L 手动舒适型',
                guidePrice: '5.98万',
            },
            {
                id: 'znXL0GEJHtqRBY8vSegrF3A11',
                brand: '北汽幻速',
                label: null,
                model: '2017款幻速H6 1.5L 基本型 厢式运输车',
                guidePrice: '5.98万',
            },
        ];

        // AsyncStorage.getItem('user', function (error, result) {
        //     if (error) {
        //         alert('读取失败');
        //     } else {
        //     }
        // }).then((result) => {
        //     this.setState({username: result});
        //     fetch(gUrl.httpurl + '/getuserlist')
        //         .then((response) => {
        //             this.res = JSON.parse(response._bodyText);
        //             for (var i = 0; i < this.res.length; i++) {
        //                 if (this.res[i].username == this.state.username) {
        //                     this.setState({userid: this.res[i].id});
        //                 }
        //             }
        //             fetch(gUrl.httpurl + '/getorderlistbyuserid?userid=' + this.state.userid)
        //                 .then((response) => {
        //                     this.res = JSON.parse(response._bodyText);
        //                     this.setState({data: this.res});
        //                     console.log(this.state.data);
        //                     for (var j = 0; j < this.state.data.length; j++) {
        //                         fetch(gUrl.httpurl + '/findcarbyid?id=' + this.state.data[j].carid)
        //                             .then((response) => {
        //                                 this.res = JSON.parse(response._bodyText);
        //                                 this.car.push(this.res[0]);
        //                             })
        //                             .catch((error) => {
        //                                 console.log(error);
        //                             });
        //                     }
        //                     console.log(this.car);
        //                 })
        //                 .catch((error) => {
        //                     console.log(error);
        //                 });
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // });
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
                    <Text style={{color: 'black', fontSize: 18}}>我的订单</Text>
                </View>
                <FlatList
                    data={this.car}
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
                                    source={require('./../../../../../static/img/car.jpg')}
                                />
                            </View>
                            <View style={{width: width / 3}}>
                                <Text>{item.model}</Text>
                                <View style={{height: 3}} />
                                <Text>首付:5000元</Text>
                                <View style={{height: 3}} />
                                <Text>月供:5000元</Text>
                                <View style={{height: 3}} />
                                <Text>期数:36期</Text>
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
                                    <Text style={{color: 'white'}}>分享砍价</Text>
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
                                    <Text style={{color: 'white'}}>完善信息</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}
