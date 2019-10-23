import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import { 
    LOGIN_USER_SUCCESS,
    START_REGISTER,
    REGISTER_FAILED
} from './types';

export const onUserRegister = ({email,username,password,conPassword}) => {
    return (dispatch) => {
        dispatch({ type: START_REGISTER })
        if(email !== '' 
            && username !== '' 
            && password !== '' 
            && conPassword !== ''
        ) {
            if(password === conPassword) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        // console.log(res)
                        res.user.updateProfile({
                            displayName: username,
                            photoURL: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg'
                        }).then(() => {
                            // console.log(res.user)
                            firebase.database().ref(`/users/${res.user.uid}`)
                                .push({ 
                                    displayName: username, 
                                    photoURL: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg'
                                }).then(() => {
                                    firebase.auth().signInWithEmailAndPassword(email, password)
                                        .then((res) => {
                                            console.log(res.user)
                                            dispatch({
                                                type: LOGIN_USER_SUCCESS,
                                                payload: res.user
                                            });
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                            dispatch({ 
                                                type: REGISTER_FAILED, 
                                                payload: err.message 
                                            });
                                        });
                                }).catch((err) => {
                                    dispatch({ 
                                        type: REGISTER_FAILED, 
                                        payload: err.message 
                                    });
                                })
                        }).catch(err => {
                            dispatch({ 
                                type: REGISTER_FAILED, 
                                payload: err.message 
                            });
                        })
                    }).catch((err) => {
                        console.log(err)
                        dispatch({ 
                            type: REGISTER_FAILED, 
                            payload: err.message 
                        });
                    })
            } else {
                dispatch({ 
                    type: REGISTER_FAILED, 
                    payload: 'Confirm Password and Password Must Equal'
                })
            }
        } else {
            dispatch({ 
                type: REGISTER_FAILED, 
                payload: 'Please Fill All The Inputs Above'
            })
        }
    }
}