// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEiClWWMLVFYy-RqrpnELQQxmOH6eAveM",
  authDomain: "legologv2.firebaseapp.com",
  projectId: "legologv2",
  storageBucket: "legologv2.firebasestorage.app",
  messagingSenderId: "298948582370",
  appId: "1:298948582370:web:46322ddc6a3c8576d877bb",
  measurementId: "G-N8CZYP84F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
