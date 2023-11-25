// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD84yC5MGM-ShoHuIEg5iZIobbGxe9z9nY",
  authDomain: "community-65658.firebaseapp.com",
  databaseURL: "https://community-65658-default-rtdb.firebaseio.com",
  projectId: "community-65658",
  storageBucket: "community-65658.appspot.com",
  messagingSenderId: "189595979563",
  appId: "1:189595979563:web:0f9e7e509e0f80c31cff6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
