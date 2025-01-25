import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration (place this BEFORE initialization)
const firebaseConfig = {
  apiKey: "AIzaSyCGxCWo08N7Mm3kBuYGiXdQqOYSzLmQT7E",
  authDomain: "ideahive-f4c8c.firebaseapp.com",
  projectId: "ideahive-f4c8c",
  storageBucket: "ideahive-f4c8c.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "616552097065",
  appId: "1:616552097065:web:b9318d2f4496b77151c338",
  measurementId: "G-BERMRW1C73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase App Initialized: ", app);

export { auth, db, storage };
