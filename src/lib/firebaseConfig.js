import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDGK5Z0P0CBsvDzmsMQzwSaTkRkYcBPwLo",
  authDomain: "quiendamas-ad229.firebaseapp.com",
  projectId: "quiendamas-ad229",
  storageBucket: "quiendamas-ad229.firebasestorage.app",
  messagingSenderId: "1096789466362",
  appId: "1:1096789466362:web:71159f1b5b1c010f0a7d43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };