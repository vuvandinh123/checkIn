// const db= app.firestore();

import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCcFTEJ9CzwwrSaFxX8GbCDLZT4uEj84fc",
  authDomain: "student-3a304.firebaseapp.com",
  projectId: "student-3a304",
  storageBucket: "student-3a304.appspot.com",
  messagingSenderId: "264282912219",
  appId: "1:264282912219:web:ba487e934f2f576fade3fe",
  measurementId: "G-FP18Y0KTRJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

