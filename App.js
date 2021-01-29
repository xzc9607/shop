/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import IndexPage from './app/pages/Index/indexpage';
import NewProducts from './app/pages/NewProducts/NewProducts';
import Minepage from './app/pages/mine/Minepage';

//登录
import Loginpage from './app/pages/login/loginpage';
import Registerpage from './app/pages/login/register/registerpage';
import Forgetpasswordpage from './app/pages/login/forgetpassword/forgetpasswordpage';

//搜索
import Searchpage from './app/pages/search/searchpage';

import MyOrder from './app/pages/mine/childrenpage/MyOrder/MyOrderpage';
import MyFocusPro from './app/pages/mine/childrenpage/MyFocusPro/MyFocusPropage';
import MyFocus from './app/pages/mine/childrenpage/MyFocus/MyFocuspage';
import MyAdvice from './app/pages/mine/childrenpage/MyAdvice/MyAdvicepage';
import UnderStanding from './app/pages/mine/childrenpage/UnderStanding/UnderStanding';
import FeedBack from './app/pages/mine/childrenpage/FeedBack/FeedBackpage';
import MySetting from './app/pages/mine/childrenpage/MySetting/MySetting';
import About from './app/pages/mine/childrenpage/MySetting/About/Aboutpage';
import UserInformation from './app/pages/mine/childrenpage/UserInformation/UserInformation';

export const TabNav = createBottomTabNavigator(
    {
        Index: {
            screen: IndexPage,
        },
        NewCar: {
            screen: NewProducts,
        },
        Mine: {
            screen: Minepage,
        },
    },
    {
        tabBarOptions: {
            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: '#4BC1D2',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#ffffff',
            //是否显示tab bar的图标，默认是false
            showIcon: true,
            //showLabel - 是否显示tab bar的文本，默认是true
            showLabel: true,
            //是否将文本转换为大小，默认是true
            upperCaseLabel: false,
            //material design中的波纹颜色(仅支持Android >= 5.0)
            pressColor: '#ffffff',
            //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
            pressOpacity: 0.8,
            //tab bar的样式
            style: {
                backgroundColor: '#ff2400',
                paddingBottom: 1,
                borderTopWidth: 0.2,
                paddingTop: 0.5,
                borderTopColor: '#ccc',
                marginBottom: -5,
                //tab bar的文本样式
                labelStyle: {
                    fontSize: 13,
                    margin: 1,
                },
                //tab 页指示符的样式 (tab页下面的一条线).
                indicatorStyle: {height: 0},
            },
            //tab bar的位置, 可选值： 'top' or 'bottom'
            tabBarPosition: 'bottom',
            //是否允许滑动切换tab页
            swipeEnabled: false,
            //是否在切换tab页时使用动画
            animationEnabled: false,
            //是否懒加载
            lazy: true,
            //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
            backBehavior: 'none',
        },
    },
);

const RootStack = createStackNavigator(
    {
        Searchpage: {
            screen: Searchpage,
        },
        Loginpage: {
            screen: Loginpage,
        },
        Registerpage: {
            screen: Registerpage,
        },
        Forgetpasswordpage: {
            screen: Forgetpasswordpage,
        },
        MyOrder: {
            screen: MyOrder,
        },
        MyFocus: {
            screen: MyFocus,
        },
        MyFocusPro: {
            screen: MyFocusPro,
        },
        MyAdvice: {
            screen: MyAdvice,
        },
        UnderStanding: {
            screen: UnderStanding,
        },
        FeedBack: {
            screen: FeedBack,
        },
        MySetting: {
            screen: MySetting,
        },
        About: {
            screen: About,
        },
        UserInformation: {
            screen: UserInformation,
        },
        Main: {
            screen: TabNav,
            navigationOptions: ({navigation}) => ({
                headerShown: null,
            }),
        },
    },
    {
        initialRouteName: 'Main',
        headerMode: 'screen',
    },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
