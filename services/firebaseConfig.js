import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firestore from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyClnzHmqqNjPcYM2MxigSxg8izxeHz070w",
  
    authDomain: "swimgoalieash.firebaseapp.com",
  
    projectId: "swimgoalieash",
  
    storageBucket: "swimgoalieash.appspot.com",
  
    messagingSenderId: "307981290205",
  
    appId: "1:307981290205:web:80aa13b97cbc9cc4c32934"
  
  };
  
  

let app = !firebase.default.apps.length ? firebase.default.initializeApp(firebaseConfig) : firebase.default.app();
const auth = firebase.default.auth(app);
const db = app.firestore();
db.settings({merge: true });

export { app, auth,db }

