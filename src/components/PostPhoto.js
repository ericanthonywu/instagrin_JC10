import React, {Component} from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import {Header, Button, Input, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import RNFetchBlob from 'react-native-fetch-blob';
import {connect} from 'react-redux';

class PostPhoto extends Component {
    state = {
        caption: '',
        image: null,
        loading: false,
        error: '',
    };

    onBtnPostImagePress = async () => {
        this.setState({loading: true, error: ''});
        try {
            const image = this.state.image.path;

            const Blob = RNFetchBlob.polyfill.Blob;
            const fs = RNFetchBlob.fs;
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
            window.Blob = Blob;

            // const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            const nama = this.props.user.displayName.toLowerCase().replace(/\s/g, '');
            const uniqid = nama + Date.now() + '.jpg';

            const imageRef = firebase.storage().ref('posts').child(uniqid);
            let mime = 'image/jpg';
            const data = await fs.readFile(image, 'base64');
            const blob = await Blob.build(data, {type: `${mime};BASE64`});
            await imageRef.put(blob, {contentType: mime});
            await blob.close();
            const url = await imageRef.getDownloadURL();
            await firebase.database().ref('/posts')
                .push({
                    imageURL: url,
                    caption: this.state.caption,
                    userId: this.props.user.uid,
                });
            this.setState({loading: false});
        } catch (error) {
            this.setState({loading: false, error: error.message});
        }
    };

    onBtnOpenCameraPress = () => {
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true,
        }).then(img => {
            this.setState({image: img});
        }).catch(cancel => {
            console.log(cancel);
        });
    };

    onBtnSelectGaleryPress = () => {
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo',
        }).then(img => {
            this.setState({image: img});
        }).catch(cancel => {
            console.log(cancel);
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={{
                        text: 'Select Image',
                        style: {color: 'black', fontSize: 18, fontWeight: '700'},
                    }}
                    leftContainerStyle={{flex: 3}}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -25,
                        elevation: 2,
                    }}
                />
                <ScrollView>
                    <View style={{marginVertical: 20, marginHorizontal: 15}}>
                        <Button
                            icon={
                                <Icon
                                    name="photo-library"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Select from Gallery"
                            onPress={this.onBtnSelectGaleryPress}
                            containerStyle={{marginBottom: 15}}
                            buttonStyle={{backgroundColor: 'black'}}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="photo-camera"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Open Camera"
                            onPress={this.onBtnOpenCameraPress}
                            buttonStyle={{backgroundColor: 'black'}}
                        />
                        <Input
                            placeholder='Caption'
                            onChangeText={(text) => this.setState({caption: text})}
                            value={this.state.caption}
                        />
                    </View>
                    <View style={{marginHorizontal: 15, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={{uri: this.state.image ? this.state.image.path : null}}
                            style={{height: 350, width: '100%'}}
                        />
                    </View>
                    <View style={{marginVertical: 20, marginHorizontal: 15}}>
                        <Text style={{color: 'red'}}>{this.state.error}</Text>
                        <Button
                            icon={
                                <Icon
                                    name="cloud-upload"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Post Image"
                            buttonStyle={{backgroundColor: 'black'}}
                            onPress={this.onBtnPostImagePress}
                            loading={this.state.loading}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user,
    };
};

export default connect(mapStateToProps)(PostPhoto);
