
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'


const app = firebase.initializeApp({

    apiKey: "AIzaSyCiQLK0ERDqGie-ugm9c5E4Ro9KKPLDhtU",
    authDomain: 'fusio-test.firebaseapp.com',
    databaseURL: "https://fusio-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: 'fusio-test',
    storageBucket: 'fusio-test.appspot.com',
    messagingSenderId:'363803703138',
    appId: '1:363803703138:web:e6366650cfe7cb35c75e3b'

})

 




export const db = getFirestore();
export const realtimeDB = getDatabase(app);







export const auth = app.auth()
export const storage = getStorage(app)
export default app

