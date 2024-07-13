import { initializeApp} from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore"
// import { httpsCallable } from 'firebase/functions';
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAXl2iQQmedWYtNYi-8DN_mmBaOK6h7fgU",
  authDomain: "petter-web-9b820.firebaseapp.com",
  projectId: "petter-web-9b820",
  storageBucket: "petter-web-9b820.appspot.com",
  messagingSenderId: "422046603519",
  appId: "1:422046603519:web:616fab67de7dcde66854ca"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const db = getFirestore(app)
export const functions = getFunctions(app);








