import React from 'react';
import {Header, Icon, Input, Overlay} from 'react-native-elements';
import {Image, KeyboardAvoidingView, TouchableWithoutFeedback, View} from 'react-native';
import {Body, Card, CardItem, Left, Right, Text, Thumbnail} from 'native-base';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';

class ExplorePostDetail extends React.Component {
    state = {username: '',photoURL: ''}

    componentDidMount() {
        firebase.database().ref(`users/${this.props.navigation.getParam('userId')}`).once('value').then(async post => {
            await Object.keys(post.val()).forEach(data => {
                this.setState({
                    username: post.val()[data].displayName,
                    photoURL: post.val()[data].photoURL,
                });
            });
        });
    }

    render() {
        const {navigation} = this.props;
        return (
            <View>
                <Header
                    placement='left'
                    centerComponent={{
                        text: 'Explore',
                        style: {color: 'black', fontSize: 18, fontWeight: '700'},
                    }}
                    leftComponent={
                        {
                            icon: 'arrow-back',
                            color: 'black',
                            onPress: () => this.props.navigation.goBack(),
                        }
                    }
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
                                <Thumbnail source={{uri: this.state.photoURL}}/>
                                <Body>
                                    <Text>{this.state.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: navigation.getParam('imageURL')}}
                                   style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>{navigation.getParam('caption')}</Text>
                            </Left>
                        </CardItem>
                    </Card>
                </KeyboardAvoidingView>
            </View>
        );
    }

}

export default ExplorePostDetail;
