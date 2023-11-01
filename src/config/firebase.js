import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAf8YRG47JXs7zVWzrkV8VjLmSOm3PrTgE",
  authDomain: "petter-web-3a633.firebaseapp.com",
  projectId: "petter-web-3a633",
  storageBucket: "petter-web-3a633.appspot.com",
  messagingSenderId: "44388801007",
  appId: "1:44388801007:web:05044224837338d6b8be1a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()