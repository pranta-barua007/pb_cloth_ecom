import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD32bBlb_PowWojXeW3qbKK-65nXyttfoQ",
    authDomain: "pb-cloth-db.firebaseapp.com",
    databaseURL: "https://pb-cloth-db.firebaseio.com",
    projectId: "pb-cloth-db",
    storageBucket: "pb-cloth-db.appspot.com",
    messagingSenderId: "391701163315",
    appId: "1:391701163315:web:36fec4c2a99074ded62246",
    measurementId: "G-5PPBZRL6NG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;