// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTPWVymkXKiRV1XtKxmDfaiWNRZtU0EkU",
  authDomain: "prekshithstorefront.firebaseapp.com",
  projectId: "prekshithstorefront",
  storageBucket: "prekshithstorefront.firebasestorage.app",
  messagingSenderId: "102736938747",    
  appId: "1:102736938747:web:9b57eea7657436c7cf925e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app)
const auth=getAuth(app);

export {app as firebaseApp , db, auth}