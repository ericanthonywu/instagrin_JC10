import React from 'react';
import {Header, Icon, Input} from 'react-native-elements';
import firebase from '@firebase/app';
import {Body, Card, CardItem, Left, Right, Text, Thumbnail} from 'native-base';
import {Image, KeyboardAvoidingView, ScrollView} from 'react-native';

class EditCaptionPostDetailProfile extends React.Component {
    state = {
        caption: this.props.navigation.getParam('captions'),
    };

    updateCaption = () => {
        firebase.database().ref(`/posts/${this.props.navigation.getParam('id')}`).set({
            caption: this.state.caption,
            imageURL: this.props.navigation.getParam('imageURL'),
            userId: this.props.navigation.getParam('userId'),
        }).then(() => {
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        });

    };


    render() {
        return (
            <>
                <Header
                    placement='left'
                    centerComponent={{
                        text: 'Edit Info',
                        style: {color: 'black', fontSize: 18, fontWeight: '700'},
                    }}
                    leftComponent={{
                        icon: 'close',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack(),
                    }}
                    rightComponent={{
                        icon: 'done',
                        color: 'black',
                        onPress: () => this.updateCaption(),
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : -25,
                    }}
                />
                <ScrollView>
                    <Card>
                        <CardItem>
                            <Left style={{flex: 3}}>
                                <Thumbnail source={{uri: this.props.userPhoto}}/>
                                <Body>
                                    <Text>{this.props.navigation.getParam('username')}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: this.props.navigation.getParam('imageURL')}} style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Input defaultValue={this.state.caption}
                                       onChange={event => this.setState({caption: event.nativeEvent.text})}/>
                            </Left>
                        </CardItem>
                    </Card>
                </ScrollView>
            </>
        );
    }

}

export default EditCaptionPostDetailProfile;
