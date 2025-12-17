// config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (Web app)
const firebaseConfig = {
  apiKey: "AIzaSyBEEFP8h1bmuvKwIQF6Bzj1PpxFulnzYyo",
  authDomain: "nannybloom-9871d.firebaseapp.com",
  projectId: "nannybloom-9871d",
  storageBucket: "nannybloom-9871d.appspot.com",
  messagingSenderId: "343791786332",
  appId: "1:343791786332:web:593f41f9ea2748ea59c999",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
