import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Profile from './Profile';
import EditProfile from './EditProfile';
import PostDetailProfile from './PostDetailProfile';
import EditCaptionPostDetailProfile from './EditCaptionPostDetailProfile';

const StackProfile = createAppContainer(createStackNavigator(
    {
        Profile: {
            screen: Profile
        },
        EditProfile: {
            screen: EditProfile
        },
        PostDetail: {
            screen: PostDetailProfile
        },
        EditPost: {
            screen: EditCaptionPostDetailProfile
        }
    },
    {
        initialRouteName: 'Profile',
        headerMode: 'none'
    }
));

export default StackProfile;
