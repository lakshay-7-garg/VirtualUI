// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualui-d2bd7.firebaseapp.com",
  projectId: "virtualui-d2bd7",
  storageBucket: "virtualui-d2bd7.firebasestorage.app",
  messagingSenderId: "437571976039",
  appId: "1:437571976039:web:f020fa0c8a629188da8dc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}