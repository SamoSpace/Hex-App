// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdeOy_qd4-vCUCTsqmiF6ByhJwLnGJIgw",
  authDomain: "hexnews-3d604.firebaseapp.com",
  projectId: "hexnews-3d604",
  storageBucket: "hexnews-3d604.firebasestorage.app",
  messagingSenderId: "413391529471",
  appId: "1:413391529471:web:329185f19b9f89848eb3ca",
  measurementId: "G-63NH58KZ21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth}