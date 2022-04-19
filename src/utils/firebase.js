import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyAIFqnRBkmtu_Z2J63Y9zm_SytteGKizVw",
  authDomain: "basketball-record.firebaseapp.com",
  projectId: "basketball-record",
  storageBucket: "basketball-record.appspot.com",
  messagingSenderId: "429166117652",
  appId: "1:429166117652:web:f52790d6c4ea2881857801",
  measurementId: "G-5M80973MLC",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {
  // firebase,
  // getAuth,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // onAuthStateChanged,
  // signOut,
  getFirestore,
  collection,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
};
