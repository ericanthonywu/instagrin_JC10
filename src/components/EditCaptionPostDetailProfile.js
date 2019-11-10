import React from 'react';
import {Header, Input} from 'react-native-elements';
import firebase from '@firebase/app';

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
                        text: 'Post',
                        style: {color: 'black', fontSize: 18, fontWeight: '700'},
                    }}
                    leftComponent={{
                        icon: 'cancel',
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
                <Input defaultValue={this.state.caption}
                       onChange={event => this.setState({caption: event.nativeEvent.text})}/>
            </>
        );
    }

}

export default EditCaptionPostDetailProfile;
