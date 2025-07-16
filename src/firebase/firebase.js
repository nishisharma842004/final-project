// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1SVtdfm6VhRbh3NlOUuWmk9TUIGXubGM",
  authDomain: "finalproject-7d0d8.firebaseapp.com",
  projectId: "finalproject-7d0d8",
  storageBucket: "finalproject-7d0d8.appspot.com",
  messagingSenderId: "297633312187",
  appId: "1:297633312187:web:478f892b443d6be8c6689e",
  measurementId: "G-RS3JFCVQ8K"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase Auth instance
export const auth = getAuth(app);

// ✅ Optional: Export the Firebase app itself
export default app;
