import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TabMainMenu from './TabMainMenu';

const MainStack = createAppContainer(createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        Register: {
            screen: RegisterForm
        },
        HomePage: {
            screen: ({ navigation }) => <TabMainMenu />
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
));

export default MainStack;