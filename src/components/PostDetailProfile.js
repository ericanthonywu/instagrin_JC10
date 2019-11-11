import React, {Component} from 'react';
import {View, Image, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Header, Icon, Input, Overlay} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';
import {selectProfilePost, deletePost} from '../actions';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';

class PostDetailProfile extends Component {
    state = {isVisible: false, deleteVisible: false, caption: this.props.caption};

    componentDidUpdate() {
        if (!this.props.username) {
            this.props.navigation.goBack();
        }
    }
    componentWillUnmount(): void {
        this.props.selectProfilePost(null)
    }

    // componentDidMount(){
    //     alert(JSON.stringify(this.props))
    // }

    updateData = () => {
        firebase.database().ref('/posts').once('value').then(post => {
            Object.keys(post.val()).forEach(data => {
                if(data === this.props.id) {
                    this.setState({
                        caption: post.val()[data].caption,
                    });
                }
            });
        });
    };

    onDeletePress = () => {
        this.setState({deleteVisible: false});
        this.props.deletePost(this.props.id);
    };

    render() {
        if (!this.props.username) {
            return <View/>;
        }
        return (
            <View>
                <Header
                    placement='left'
                    centerComponent={{
                        text: 'Post',
                        style: {color: 'black', fontSize: 18, fontWeight: '700'},
                    }}
                    leftComponent={{
                        icon: 'arrow-back',
                        color: 'black',
                        onPress: () => this.props.selectProfilePost(null),
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : -25,
                    }}
                />
                <KeyboardAvoidingView>
                    <Card>
                        <CardItem>
                            <Left style={{flex: 3}}>
                                <Thumbnail source={{uri: this.props.userPhoto}}/>
                                <Body>
                                    <Text>{this.props.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Icon
                                    name='more-vert'
                                    size={30}
                                    onPress={() => this.setState({isVisible: true})}
                                />
                            </Right>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: this.props.imageURL}} style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>{this.state.caption}</Text>
                            </Left>
                        </CardItem>
                    </Card>
                </KeyboardAvoidingView>
                <Overlay
                    isVisible={this.state.isVisible}
                    height={'auto'}
                    onBackdropPress={() => this.setState({isVisible: false})}
                >
                    <TouchableWithoutFeedback>
                        <Text
                            style={{
                                fontSize: 16,
                                paddingVertical: 15,
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('EditPost', {
                                    ...this.props,
                                    captions: this.state.caption,
                                    onGoBack: () => this.updateData(),
                                });
                                this.setState({isVisible: false});
                            }}
                        >
                            Edit
                        </Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.setState({isVisible: false, deleteVisible: true})}>
                        <Text
                            style={{
                                fontSize: 16,
                                paddingVertical: 15,
                            }}
                        >
                            Delete
                        </Text>
                    </TouchableWithoutFeedback>
                </Overlay>
                <Overlay
                    isVisible={this.state.deleteVisible}
                    height={'auto'}
                >
                    <View style={{alignItems: 'center'}}>
                        <View style={{
                            alignItems: 'center',
                            height: 100,
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                paddingBottom: 10,
                            }}>
                                Confirm Deletion
                            </Text>
                            <Text note>
                                Delete this post?
                            </Text>
                        </View>
                        <TouchableWithoutFeedback onPress={this.onDeletePress}>
                            <View style={{
                                paddingVertical: 12,
                                borderTopWidth: 0.3,
                                borderTopColor: '#dedede',
                                width: '100%',
                                alignItems: 'center',

                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#4388d6',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Delete
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({deleteVisible: false})}>
                            <View style={{
                                paddingVertical: 12,
                                borderTopWidth: 0.3,
                                borderTopColor: '#dedede',
                                width: '100%',
                                alignItems: 'center',
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Don't delete
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.props.deleteLoading}
                    height={'auto'}
                    width={'auto'}
                >
                    <View style={{padding: 15}}>
                        <Text style={{fontSize: 16}}>
                            Deleting ...
                        </Text>
                    </View>
                </Overlay>
            </View>
        );
    }
}

const mapStateToProps = ({post}) => {
    // console.log('Post Detail : ', post.selectedPostDetailProfile)
    return {
        ...post.selectedPostDetailProfile,
        deleteLoading: post.deleteLoading,
    };
};

export default connect(mapStateToProps, {selectProfilePost, deletePost})(PostDetailProfile);
