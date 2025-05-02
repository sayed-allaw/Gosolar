// Import the necessary Firebase functions
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBST9Z0u5GkBUNnt8PUUx6U-8ZPn3YoVzc",
  authDomain: "gosolar-11568.firebaseapp.com",
  projectId: "gosolar-11568",
  storageBucket: "gosolar-11568.appspot.com",
  messagingSenderId: "392588962708",
  appId: "1:392588962708:android:7792268dffa6c11da57d81",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase initialized:", app.name);
console.log("Firestore initialized:", db ? "Yes" : "No");

export { app, db, storage };
