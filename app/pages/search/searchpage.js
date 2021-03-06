/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput,
    Alert,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';
import Indexheader from '../components/indexheader';
import Icon from 'react-native-vector-icons/AntDesign';
import Global from '../Global';

const {width} = Dimensions.get('window'); //获取当前屏幕宽度

export default class search extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            content: null,
            productlist: [],
        };
    }

    search() {
        fetch(gUrl.httpurl + '/product/searchProduct?keyword=' + this.state.data)
            .then((responses) => responses.json())
            .then((res) => {
                this.setState({productlist: JSON.parse(JSON.stringify(res))});
                if (this.state.productlist.length === 0) {
                    Alert.alert('没有搜索到相关记录');
                }
                //console.log(this.state.productlist.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Indexheader />
                <View
                    style={{
                        height: 50,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                                height: 35,
                                width: (width / 4) * 3,
                                backgroundColor: '#f1f1f1',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TextInput
                                style={{
                                    height: 35,
                                    width: (width / 4) * 3,
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                placeholder={'请输入需要搜索的内容'}
                                onChangeText={(data) => this.setState({data})}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{justifyContent: 'flex-end', marginStart: 10}}>
                        <TouchableWithoutFeedback onPress={() => this.search()}>
                            <Text>
                                <Icon name="search1" size={15} color="#000" />
                                搜索
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <FlatList
                    data={this.state.productlist}
                    ListEmptyComponent={
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
                            <Text style={{fontSize: 30}}>空空如也</Text>
                        </View>
                    }
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
});
