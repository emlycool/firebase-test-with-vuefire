import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCIBfxV8uxI4_kpjxCeulLlWR4JsZx0sJA",
    authDomain: "moshman-blog.firebaseapp.com",
    projectId: "moshman-blog",
    storageBucket: "moshman-blog.appspot.com",
    messagingSenderId: "575801508851",
    appId: "1:575801508851:web:61681e0280b2eb6bca8886",
    measurementId: "G-YBDZPZSPYW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();

// export const toDate = ((timestamp) => (firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds) ) )

export default firebaseApp.firestore()