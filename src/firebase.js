import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyAzV_I2vjPEDNCdSvx6a8W-CVnvu21rwxA",
    authDomain: "newpost-8726c.firebaseapp.com",
    projectId: "newpost-8726c",
    storageBucket: "newpost-8726c.appspot.com",
    messagingSenderId: "711765597420",
    appId: "1:711765597420:web:e8a5b99f017be47a4759c9",
    measurementId: "${config.measurementId}"
})

export const auth = firebase.auth();

// export const getFirestore = firebase.firestore();
export function getFirestore(){
    
    return firebase.firestore(app)
    // return firebase.auth.GoogleAuthProvider(googleProvider)
}
export function getStorage(){
    
    return firebase.storage(app)
    // return firebase.auth.GoogleAuthProvider(googleProvider)
}


export default app;