// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{ getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBII7M4A4-FggGX1MJHVHjgW986VDnNe4",
  authDomain: "metro-f56f2.firebaseapp.com",
  projectId: "metro-f56f2",
  storageBucket: "metro-f56f2.appspot.com",
  messagingSenderId: "960881872539",
  appId: "1:960881872539:web:0655908c1ecc5765bb403e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db= getFirestore(app)
export const storage= getStorage()