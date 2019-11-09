import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import MainStack from './src/components/MainStack';
import { connect } from 'react-redux';
import { alreadyLogin, notLoginYet } from './src/actions';

class AppInit extends Component {
  componentDidMount() {
    // Your web app's Firebase configuration
      const firebaseConfig = {
          apiKey: "AIzaSyAdZ2UJT2v5CQ_46eBHv_D4lb9S2yBRhNA",
          authDomain: "instagrin-jc10-c8802.firebaseapp.com",
          databaseURL: "https://instagrin-jc10-c8802.firebaseio.com",
          projectId: "instagrin-jc10-c8802",
          storageBucket: "instagrin-jc10-c8802.appspot.com",
          messagingSenderId: "633827865414",
          appId: "1:633827865414:web:b8e856f44712466d07eb47",
          measurementId: "G-GYQTVG6GHF"
      };
    // Initialize Firebase
    //console.log('Isi Firebase Apps', firebase.apps)
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.props.alreadyLogin(user);
        } else {
            this.props.notLoginYet();
        }
    })
  }

  render() {
    return (
      <MainStack />
    )
  }
}

export default connect(null, { notLoginYet, alreadyLogin })(AppInit);
