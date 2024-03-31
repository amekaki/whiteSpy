/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import {registeUser} from '../../api/auth'
import {loginUser} from '../../api/auth'
export default {
    loginAttempt({ dispatch }, payload) {

        // New payload for login action
        const newPayload = {
            userDetails: payload.userDetails,
            notify: payload.notify
        }

        // If remember_me is enabled change firebase Persistence
        if (!payload.checkbox_remember_me) {
            // TODO  记住密码实现
            // Change firebase Persistence
            // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            //
            //     // If success try to login
            //     .then(function() {
            //         dispatch('login', newPayload)
            //     })
            //
            //     // If error notify
            //     .catch(function(err) {
            //         payload.notify({
            //             time: 2500,
            //             title: 'Error',
            //             text: err.message,
            //             iconPack: 'feather',
            //             icon: 'icon-alert-circle',
            //             color: 'danger'
            //         });
            //     });
          dispatch('login', newPayload)
        } else {
            // Try to login
            dispatch('login', newPayload)
        }
    },
    login({ commit }, payload) {
      console.log("LOGIN")
        // Try to sigin
        loginUser(payload.userDetails.phonenumber, payload.userDetails.password)

            .then((result) => {
              // payload.loading.close()
                if(result.data.code==200){
                  commit('UPDATE_TOKEN', result.data.msg)
                }else{
                }
            }, (err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
    },

    // Google Login
    loginWithGoogle({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
            return false
        }
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/');
                commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //         user.updateProfile({
        //             roles: ['admin'],
        //         }).then(function() {
        //             this.$vs.notify({
        //                 title: 'Success',
        //                 text: "done",
        //                 iconPack: 'feather',
        //                 icon: 'icon-check',
        //                 color: 'success'
        //             });
        //         }, function(error) {
        //             this.$vs.notify({
        //                 title: 'Error',
        //                 text: error.message,
        //                 iconPack: 'feather',
        //                 icon: 'icon-alert-circle',
        //                 color: 'danger'
        //             });
        //         });

        //     }
        // });
    },

    // Facebook Login
    loginWithFacebook({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
            return false
        }
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/');
                commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
    },

    // Twitter Login
    loginWithTwitter({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
            return false
        }
        const provider = new firebase.auth.TwitterAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/');
                commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
    },

    // Github Login
    loginWithGithub({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
            return false
        }
        const provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/');
                commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
    },
  registerUser({dispatch}, payload) {

    // create user using firebase
    registeUser(payload.userDetails.username, payload.userDetails.password,payload.userDetails.phonenumber)
      .then((response) => {
        if (response.data.code==200){
        payload.notify({
          title: 'Success',
          text: response.data.msg,
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        });

        const newPayload = {
          userDetails: payload.userDetails,
          notify: payload.notify,
          updateUsername: true
        }
        dispatch('login', newPayload)
        }else {
          payload.notify({
          title: 'Fail',
          text: response.data.msg,
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        });
        }
      }, (error) => {
        payload.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },
    updateUsername({ commit }, payload) {
        payload.user.updateProfile({
            displayName: payload.username
        }).then(() => {

            // If username update is success
              // update in localstorage
            let newUserData = Object.assign({}, payload.user.providerData[0])
            newUserData.displayName = payload.username
            commit('UPDATE_AUTHENTICATED_USER', newUserData)

            // If reload is required to get fresh data after update
              // Reload current page
            if(payload.isReloadRequired) {
                router.push(router.currentRoute.query.to || '/')
            }
        }).catch((err) => {
              payload.notify({
                time: 8800,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            });
        })
    },
    updateAuthenticatedUser({ commit }, payload) {
        commit('UPDATE_AUTHENTICATED_USER', payload)
    }
}
