import React, {Component} from 'react';
import {View, Text, Platform, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Header, ListItem, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {initEditProfile, selectProfilePost} from '../actions';

class Profile extends Component {

    componentDidUpdate() {
        if (this.props.postDetail) {
            this.props.navigation.navigate('PostDetail');
        }
    }

    onBtnEditProfilePress = () => {
        this.props.initEditProfile({
            username: this.props.user.displayName,
            profileImage: this.props.user.photoURL,
        });
        this.props.navigation.navigate('EditProfile');
    };

    renderListPost = () => {
        var i = 2;
        return this.props.listPost.map((item, index) => {
            var styleObj = {width: '33%', marginVertical: 1};
            if ((index + 1) === i) {
                i += 3;
                styleObj.marginHorizontal = '0.5%';
            }
            return (
                <View
                    style={styleObj}
                >
                    <TouchableWithoutFeedback onPress={() => this.props.selectProfilePost(item)}>
                        <Image source={{uri: item.imageURL}} style={{height: 125, width: '100%'}}/>
                    </TouchableWithoutFeedback>
                </View>
            );
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={{
                        text: this.props.user.displayName.toLowerCase().replace(/\s/g, ''),
                        style: {color: 'black', fontSize: 18, fontWeight: '700'},
                    }}
                    leftContainerStyle={{flex: 3}}
                    rightComponent={{
                        icon: 'menu',
                        color: 'black',
                        onPress: () => this.props.navigation.toggleDrawer(),
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -25,
                        borderBottomWidth: 0.5,
                    }}
                />
                <ScrollView>
                    <ListItem
                        leftAvatar={{
                            source: {uri: this.props.user.photoURL},
                            size: 'large',
                        }}
                        title={this.props.user.displayName}
                        subtitle={'Instagrin User'}
                    />
                    <Button
                        title="Edit Profile"
                        containerStyle={{
                            marginVertical: 15,
                            marginHorizontal: 15,
                            borderWidth: 0.5,
                            borderColor: 'gray',
                        }}
                        buttonStyle={{borderColor: 'gray'}}
                        titleStyle={{color: 'black'}}
                        type='outline'
                        onPress={this.onBtnEditProfilePress}
                    />
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flex: 1,
                        // justifyContent: 'space-between'
                    }}>
                        {this.renderListPost()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({auth, post}) => {
    const user = auth.user ? auth.user : {uid: '', displayName: '', photoURL: ''};
    const listPost = post.postList.filter((item, index) => {
        return user.uid === item.userId;
    });
    return {
        user,
        listPost,
        postDetail: post.selectedPostDetailProfile,
    };
};

export default connect(mapStateToProps, {initEditProfile, selectProfilePost})(Profile);
