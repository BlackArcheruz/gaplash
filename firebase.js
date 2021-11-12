import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCn30YdMiLBTbAwMgn6t0DoP3lUjW4OPmg",
    authDomain: "gaplash-907ff.firebaseapp.com",
    projectId: "gaplash-907ff",
    storageBucket: "gaplash-907ff.appspot.com",
    messagingSenderId: "404495609070",
    appId: "1:404495609070:web:5d5e7ee98492e8870a57ff"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};