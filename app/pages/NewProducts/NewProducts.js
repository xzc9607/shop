/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Indexheader from '../components/indexheader';
import Swipercomponent from '../components/swipercomponent';
import Global from '../Global';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class NewProducts extends Component {
    static navigationOptions = {
        tabBarLabel: '新品',
        headerShown: null,
        tabBarIcon: ({focused, tintColor}) => <Icon name="inbox" size={28} color="#ffffff" />,
    };

    constructor(props, context) {
        super(props);

        this.state = {
            text: '个性SUV',
            isOpen: false,
            productlist: [],
        };

        fetch(gUrl.httpurl + '/product/getProductlist')
            .then((responses) => responses.json())
            .then((res) => {
                this.setState({productlist: JSON.parse(JSON.stringify(res))});
                //console.log(this.state.productlist);
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

                <View
                    style={{
                        height: 45,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View style={{justifyContent: 'flex-start'}}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    isOpen: true,
                                });
                            }}>
                            <Text style={{justifyContent: 'center'}}>
                                店铺
                                <Icon name="down" size={15} color="#000" />
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Searchpage')}>
                        <View
                            style={{
                                height: 35,
                                width: (width / 4) * 3,
                                backgroundColor: '#f1f1f1',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="search1" size={15} color="#000" />
                                <Text>搜索</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{justifyContent: 'flex-end', marginStart: 10}}>
                        <TouchableWithoutFeedback onPress={() => this.getnumber()}>
                            <Icon name="phone" size={20} color="#000" />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.swiperview}>
                        <Swipercomponent />
                    </View>

                    <View style={{marginTop: 15, backgroundColor: 'white'}} />

                    <FlatList
                        data={this.state.productlist}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CarPage', {item})}>
                                <View style={{backgroundColor: 'white'}}>
                                    <View style={styles.listtext}>
                                        <View
                                            style={{
                                                width: (2 * width) / 5,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Image
                                                resizeMode="stretch"
                                                style={styles.listimage}
                                                source={require('./../../../static/img/car.jpg')}
                                            />
                                        </View>
                                        <View style={styles.listbody}>
                                            <View style={{width: (3 * width) / 5, marginStart: 20}}>
                                                <Text style={{color: 'black', fontSize: 19}}>{item.productname}</Text>
                                                <Text style={{color: 'black', fontSize: 19}}>{item.kind}</Text>
                                                <Text>厂商指导价{item.price}元</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    />
                </ScrollView>
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
        //backgroundColor: 'black',
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
});
