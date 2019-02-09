import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCi0WNop5tu2uRzq_Qw6QD87S1g_c_zxYQ",
    authDomain: "ninja-smoothies-mdl.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-mdl.firebaseio.com",
    projectId: "ninja-smoothies-mdl",
    storageBucket: "ninja-smoothies-mdl.appspot.com",
    messagingSenderId: "846082229774"
  };
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true})

//export firestore database
export default firebaseApp.firestore()