// import * as firebase from 'firebase/app'
// Your web app's Firebase configuration





import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyCVUlIj2JXNtI3LaeIvh8M9nEF06PKZIWk",
    authDomain: "whatspclone-83a2c.firebaseapp.com",
    projectId: "whatspclone-83a2c",
    storageBucket: "whatspclone-83a2c.appspot.com",
    messagingSenderId: "627506319565",
    appId: "1:627506319565:web:98d00ccb983f07cba25984"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;