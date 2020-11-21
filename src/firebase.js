import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyAwJqLDgiTEzPVGkRYiDQVh-SxzxEcDk3I",
    authDomain: "slack-clone-56e13.firebaseapp.com",
    databaseURL: "https://slack-clone-56e13.firebaseio.com",
    projectId: "slack-clone-56e13",
    storageBucket: "slack-clone-56e13.appspot.com",
    messagingSenderId: "325739575240",
    appId: "1:325739575240:web:fad4e41709db0ec22072fd",
    measurementId: "G-KT2BF9HXZS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage().ref();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase
    .firestore()
    .settings({ timestampsInSnapshots: true });
