import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBEEFP8h1bmuvKwIQF6Bzj1PpxFulnzYyo",
  authDomain: "nannybloom-9871d.firebaseapp.com",
  projectId: "nannybloom-9871d",
  storageBucket: "nannybloom-9871d.appspot.com",
  messagingSenderId: "343791786332",
  appId: "1:343791786332:web:593f41f9ea2748ea59c999",
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth with persistent storage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
