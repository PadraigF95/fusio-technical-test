
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import "firebase/compat/storage"


const app = firebase.initializeApp({

    apiKey: "AIzaSyCiQLK0ERDqGie-ugm9c5E4Ro9KKPLDhtU",
    authDomain: 'fusio-test.firebaseapp.com',
    projectId: 'fusio-test',
    storageBucket: 'fusio-test.appspot.com',
    messagingSenderId:'363803703138',
    appId: '1:363803703138:web:e6366650cfe7cb35c75e3b'

})

 export const storage = firebase.storage();




export const db = getFirestore();

const colRef = collection(db, 'weather-data')

getDocs(colRef).then((snapshot) => {
        
 let forecast = []
    snapshot.docs.forEach((doc) => {
        forecast.push({ ...doc.data(), id: doc.id})
        
    })
        
})

export const auth = app.auth()
export default app

// forecast is an array with station as an object inside forecast
// Then an array inside the station object which contains id, location and day
// But day is an object with several arrays