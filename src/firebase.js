// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let firebaseApp;
let db, auth, storage;

try {
  // Validate that all required keys exist before initializing
  if (!config.apiKey || !config.projectId) {
    throw new Error("Missing Firebase environment variables");
  }

  firebaseApp = initializeApp(config);
  db = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
  storage = getStorage(firebaseApp);

  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error.message);
  // Provide fallbacks so the app still renders
  db = null;
  auth = null;
  storage = null;
}

export { db, auth, storage };
export default firebaseApp;
