import { initializeApp } from "firebase/app";
import firebaseConfig from "@/config/firebaseConfig.json";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();
