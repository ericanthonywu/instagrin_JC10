import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Explore from './Explore';
import ExplorePostDetail from './ExplorePostDetail';

const StackExplore = createAppContainer(createStackNavigator(
    {
        Explore: {
            screen: Explore
        },
        DetailPost: {
            screen: ExplorePostDetail
        },
    },
    {
        initialRouteName: 'Explore',
        headerMode: 'none'
    }
));

export default StackExplore;
