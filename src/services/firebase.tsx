
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCErtrB-Y1eR96zECY67AfTKTjmZUGgCLM",
  authDomain: "motorrescue-3b017.firebaseapp.com",
  projectId: "motorrescue-3b017",
  storageBucket: "motorrescue-3b017.appspot.com",
  messagingSenderId: "558880787978",
  appId: "1:558880787978:web:44470fb93d0d6d04f159f3",
  measurementId: "G-EKT24ZZN8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
//export const provider = new GoogleAuthProvider();