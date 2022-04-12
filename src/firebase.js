
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getDocs, collection, getFirestore, doc, query, limit } from 'firebase/firestore'
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

const colRef = collection(db, 'data', 'days', 'day')

// const q = query(colRef, limit(1));
// console.log(q)
// const forecast = []

// getDocs(colRef).then((snapshot) => {
        
 
//     snapshot.docs.forEach((doc) => {
//         forecast.push({ ...doc.data(), id: doc.id})
//         console.log('hello',weatherData)
//     })
        
// })





export const auth = app.auth()
export const storage = getStorage(app)
export default app

// forecast is an array with station as an object inside forecast
// Then an array inside the station object which contains id, location and day
// But day is an object with several arrays