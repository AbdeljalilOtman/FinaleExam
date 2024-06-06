import firebase from 'firebase/app' // the core part of firebase package
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';     
// Then we import any features from firebase that we want to use
// in our case it is cloud firestore
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCexHHrZO_wtwm065YUEBm6_MHGN6uBKy0",
  authDomain: "finale-exam.firebaseapp.com",
  projectId: "finale-exam",
  storageBucket: "finale-exam.appspot.com",
  messagingSenderId: "70141754263",
  appId: "1:70141754263:web:99e375d7f024928a2f22d2"
};
// Step 1 : init firebase
// we use the firebaseConfig to init the connection to our firebase backend
firebase.initializeApp(firebaseConfig)
// Step 2 : Init the firestore service
// If we want to do any communication with the firestore db (eg. add documents)
// we can use projectFirestore variable
const projectFirestore = firebase.firestore()
//Step 3 : Export projectFirestore
// This will enable the use the firebase in different components
export {projectFirestore}

