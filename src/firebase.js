
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getDocs, collection, getFirestore } from 'firebase/firestore'

const app = firebase.initializeApp({

    apiKey: "AIzaSyCiQLK0ERDqGie-ugm9c5E4Ro9KKPLDhtU",
    authDomain: 'fusio-test.firebaseapp.com',
    projectId: 'fusio-test',
    storageBucket: 'fusio-test.appspot.com',
    messagingSenderId:'363803703138',
    appId: '1:363803703138:web:e6366650cfe7cb35c75e3b'

})

export const db = getFirestore();

const colRef = collection(db, 'weather')

getDocs(colRef).then((snapshot) => {
        
 let weather = []
    snapshot.docs.forEach((doc) => {
        weather.push({ ...doc.data(), id: doc.id})
    })
        console.log(weather.map)
})

export const auth = app.auth()
export default app