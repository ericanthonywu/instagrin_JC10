import React from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {selectProfilePost} from '../actions';

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: []};
    }


    componentDidMount() {
        firebase.database().ref('/posts').once('value').then(post => {
            let arrData = [];
            Object.keys(post.val()).forEach(data => {
                const currentData = post.val()[data];
                if (currentData.userId !== this.props.userId) {
                    arrData.push(currentData);
                }
            });
            this.setState({
                post: arrData,
            });
        });
    }


    render() {
        return (
            <>
                <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row'}}>
                    {this.state.post.map(post =>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("DetailPost",post)}>
                            <View style={{width: '30%', paddingLeft: 10, paddingRight: 10}}>
                                <Image source={{uri: post.imageURL}} style={{width: '100%', height: 100}}/>
                            </View>
                        </TouchableWithoutFeedback>)}
                </View>
            </>
        );
    }

}

const mapToStateProps = data => {
    return {
        userId: data.auth.user.uid,
    };
};

export default connect(mapToStateProps,{selectProfilePost})(Explore);
