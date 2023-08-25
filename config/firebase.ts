import { GoogleAuthProvider, getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3qaup2jhcwKB6Sm66GMBY9T46h0q8G_o",
  authDomain: "tweeter-3ee0c.firebaseapp.com",
  projectId: "tweeter-3ee0c",
  storageBucket: "tweeter-3ee0c.appspot.com",
  messagingSenderId: "536324132397",
  appId: "1:536324132397:web:1d39655492f1ab655c72a4",
  measurementId: "G-7678NLBCBQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
