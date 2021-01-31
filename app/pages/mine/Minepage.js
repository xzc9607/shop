import React, {Component} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Minepageheader from '../components/minepageheader';
// eslint-disable-next-line no-unused-vars
import Global from '../Global';

//列表分割线
class ItemDivideComponent extends Component {
    render() {
        return (
            <View
                style={{
                    height: 1.3,
                    backgroundColor: 'white',
                    marginRight: Dimensions.get('window').width - 20,
                }}
            />
        );
    }
}

export default class Minepage extends Component {
    static navigationOptions = {
        tabBarLabel: '个人',
        tabBarIcon: ({focused, tintColor}) => <Icon name="user" size={25} color="#ffffff" />,
    };

    constructor(props) {
        super(props);

        this.state = {
            sourceData1: [
                {key: '我的订单', function: 'MyOrder'},
                {key: '我的关注', function: 'MyFocus'},
                {key: '我的反馈', function: 'MyAdvice'},
            ],
            sourceData2: [
                {key: '了解XX', function: 'UnderStanding'},
                {key: '意见反馈', function: 'FeedBack'},
                {key: '测试', function: 'Loginpage'},
                {key: '设置', function: 'MySetting'},
            ],
            username: '',
            uid: null,
            profileaddress: '',
            orderlength: null,
            focuslength: null,
            feedbacklength: null,
        };
        //关注数获取
        AsyncStorage.getItem('user', function (error, result) {
            if (error) {
                // eslint-disable-next-line no-alert
                alert('读取失败');
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
                            this.setState({profileaddress: temp[i].profileaddress});
                        }
                    }
                    // eslint-disable-next-line no-undef
                    fetch(gUrl.httpurl + '/users/getorderlistlength?uid=' + this.state.uid)
                        .then((responses) => responses.json())
                        // eslint-disable-next-line no-shadow
                        .then((res) => {
                            this.setState({orderlength: res[0].res});
                            // eslint-disable-next-line no-undef
                            fetch(gUrl.httpurl + '/users/getfocuslistlength?uid=' + this.state.uid)
                                .then((responses) => responses.json())
                                // eslint-disable-next-line no-shadow
                                .then((res) => {
                                    this.setState({focuslength: res[0].res});
                                    // eslint-disable-next-line no-undef
                                    fetch(gUrl.httpurl + '/users/getfeedbacklistlength?uid=' + this.state.uid)
                                        .then((responses) => responses.json())
                                        // eslint-disable-next-line no-shadow
                                        .then((res) => {
                                            this.setState({feedbacklength: res[0].res});
                                            //console.log(this.state.uid);
                                            //console.log(this.state.focuslength);
                                            //console.log(this.state.orderlength);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
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

    render() {
        return (
            <View style={styles.container}>
                <Minepageheader />
                <View style={styles.profilephotoview}>
                    <Image source={require('./../../../static/img/背景图@1,5x.png')} style={styles.imgStyle} />
                    <View style={{flex: 1, alignItems: 'center', marginTop: -90}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('UserInformation')}>
                            <Image
                                roundAsCircle={true}
                                style={styles.profilephoto}
                                //source={require('./../../../static/img/2.png')}
                                source={{
                                    uri: this.state.profileaddress,
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={styles.nameview}>
                    <Text style={{fontSize: 18, color: 'black'}}>{this.state.username}</Text>
                </View>
                <View style={styles.attentionview}>
                    <View style={styles.attentionviewinside}>
                        <Text>{this.state.orderlength}</Text>
                        <Text>商品订单</Text>
                    </View>
                    <View style={styles.attentionviewinside}>
                        <Text>{this.state.focuslength}</Text>
                        <Text>关注商品</Text>
                    </View>
                    <View style={styles.attentionviewinside}>
                        <Text>{this.state.feedbacklength}</Text>
                        <Text>我的反馈</Text>
                    </View>
                </View>
                <View style={{marginTop: 15}} />
                <FlatList
                    data={this.state.sourceData1}
                    ItemSeparatorComponent={ItemDivideComponent}
                    renderItem={({item}) => (
                        <View style={styles.menulist2}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(item.function)}>
                                <View style={{flex: 1, justifyContent: 'center', marginStart: 20}}>
                                    <Text style={styles.menutext}>{item.key}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                />
                <FlatList
                    data={this.state.sourceData2}
                    ItemSeparatorComponent={ItemDivideComponent}
                    renderItem={({item}) => (
                        <View style={styles.menulist2}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(item.function)}>
                                <View style={{flex: 1, justifyContent: 'center', marginStart: 20}}>
                                    <Text style={styles.menutext}>{item.key}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //主容器
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ebebeb',
    },
    nameview: {
        height: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    profilephotoview: {
        //头像容器
        height: 100,
        backgroundColor: 'white',
    },
    attentionview: {
        //关注主容器
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    attentionviewinside: {
        width: Dimensions.get('window').width / 3,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 10,
    },
    menulist1: {
        //菜单列表第一项
        height: 40,
        backgroundColor: 'white',
        marginTop: 15,
    },
    menulist2: {
        //菜单列表第二项起
        height: 40,
        backgroundColor: 'white',
    },
    menutext: {
        fontSize: 15,
        color: 'black',
    },
    imgStyle: {
        // 设置宽度
        width: Dimensions.get('window').width,
        // 设置高度
        height: 100,
    },
    profilephoto: {
        //头像
        width: 90,
        height: 90,
        alignItems: 'center',
        borderRadius: 50,
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    },
});
