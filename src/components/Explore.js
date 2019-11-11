import React from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import {Image, ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {selectProfilePost} from '../actions';
import {Input, Icon, SearchBar} from 'react-native-elements';

class Explore extends React.Component {
    state = {
        post: [],
        filteredPost: [],
        search: '',
    };


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

    filterExplore = text => {
        this.setState({
            filteredPost: this.state.post.filter(data => data.caption.includes(text)),
            search: text,
        });
    };
    renderExplore = () => {
        // this.state[this.state.search ? 'filteredPost' : 'post'].map(post =>
        //     <TouchableWithoutFeedback
        //         onPress={() => this.props.navigation.navigate('DetailPost', post)}>
        //         <View style={{width: '33.3%', marginVertical: 1}}>
        //             <Image source={{uri: post.imageURL}} style={{width: '100%', height: 125}}/>
        //         </View>
        //     </TouchableWithoutFeedback>)
        var i = 2;
        return this.state[this.state.search ? 'filteredPost' : 'post'].map((post, index) => {
            var styleObj = {width: '33%', marginVertical: 1};
            if ((index + 1) === i) {
                i += 3;
                styleObj.marginHorizontal = '0.5%';
            }
            return (
                <View
                    style={styleObj}
                >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DetailPost', post)}>
                        <Image source={{uri: post.imageURL}} style={{height: 125, width: '100%'}}/>
                    </TouchableWithoutFeedback>
                </View>
            );
        });
    };


    render() {
        return (
            <>
                <View>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={this.filterExplore}
                        value={this.state.search}
                        containerStyle={{backgroundColor: '#fff'}}
                        inputContainerStyle={{backgroundColor: '#fff'}}
                        inputStyle={{color: 'black'}}
                        lightTheme={true}
                        searchIcon={{size: 27}}
                    />
                </View>

                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flex: 1,
                        // justifyContent: 'space-between'
                    }}>
                        {this.renderExplore()}
                    </View>
                </ScrollView>
            </>
        );
    }

}

const mapToStateProps = data => {
    return {
        userId: data.auth.user.uid,
    };
};

export default connect(mapToStateProps, {selectProfilePost})(Explore);
